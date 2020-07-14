import React, { useState, useCallback, useEffect, useRef } from "react";
import { jsPlumb } from "jsplumb";
import { useDrop, XYCoord } from "react-dnd";
import { Modal } from "antd";
import { cloneDeep } from "lodash";
import { v1 as uuidv1 } from "uuid";
import FlowItem from "./flowItem";
import "./index.scss";
import useEventCallback from "../../../../hooks/useEventCallback";

const strockColor = "#8F96B3";
// https://www.cnblogs.com/leomYili/p/6346526.html
export interface NodeType {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  key: number;
  status: boolean;
}

export interface ConnectionType {
  id: string;
  sourceId: string;
  targetId: string;
}

interface Props {
  nodeData: NodeType[];
  connectionsData: ConnectionType[];
  setNodeData: (v: NodeType[]) => void;
  setConnectionsData: (v: ConnectionType[]) => void;
}

const Flow: React.FC<Props> = (props) => {
  // State
  const [jsPlumbInstance, setJsPlumbInstance] = useState<any>(null);
  const [nodeData, setNodeData] = useState<NodeType[]>(props.nodeData);
  const [connectionsData, setConnectionsData] = useState<ConnectionType[]>(
    props.connectionsData
  );
  const [currentLine, setCurrentLine] = useState<any>(null);

  // useRef
  const instanceRef = useRef<any>(null);

  // drop 释放
  const [{ canDrop }, drop] = useDrop({
    accept: "TreeNode",
    drop: (item: any, monitor) => {
      const didDrop = monitor.didDrop();
      const getClientOffset = monitor.getClientOffset();
      const data: NodeType[] = [...nodeData];
      data.push({
        ...item,
        key: nodeData.length,
        id: uuidv1(),
        x: getClientOffset && getClientOffset.x - 280,
        y: getClientOffset && getClientOffset.y - 58,
      });
      setNodeData(data);
      if (didDrop) {
        return;
      }
      return { name: "Dustbin" };
    },
    collect: (monitor) => ({
      // isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  /**
   * 获取所有连线
   */
  const getAllConnections = useCallback((): void => {
    if (instanceRef.current) {
      const connections = instanceRef.current.getAllConnections();
      const lines = connections.map((item: any) => {
        return {
          id: item.id,
          sourceId: item.sourceId,
          targetId: item.targetId,
        };
      });
      setConnectionsData(lines);
    }
  }, []);

  /**
   * 删除连线
   */
  const deleteConnection = useEventCallback(
    (labelOverlay: any) => {
      Modal.confirm({
        title: "警告!",
        content: "是否删除该连线!",
        onOk() {
          if (instanceRef.current) {
            instanceRef.current.deleteConnection(labelOverlay.component);
            setCurrentLine(null);
            getAllConnections();
          }
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    [getAllConnections]
  );

  /**
   * 删除节点
   * @param id 节点id
   */
  const deleteNode = (id: string): void => {
    if (jsPlumbInstance) {
      // 从某个元素中删除所有子元素，以及与这些子元素相关联的所有连接和端点
      const data = nodeData.filter((item) => {
        return id !== item.id;
      });
      jsPlumbInstance.deleteConnectionsForElement(id);
      jsPlumbInstance.deleteEndpoint(id);
      setNodeData(data);
      getAllConnections();
    }
  };

  /**
   * 初始化jsplumb
   */
  const initJsplumb = useCallback(() => {
    const instance = jsPlumb.getInstance({
      Connector: ["Flowchart", { cornerRadius: 5 }],
      DragOptions: { cursor: "crosshair", zIndex: 2000 },
      Endpoint: "Blank",
      EndpointStyle: { fill: "#567567" },
      PaintStyle: { stroke: strockColor, strokeWidth: 3 },
      HoverPaintStyle: { stroke: strockColor, strokeWidth: 4 },
      ConnectionOverlays: [
        [
          "Arrow",
          {
            location: 1,
            id: "arrow",
            width: 8,
            length: 12,
            foldback: 1,
          },
        ],
        [
          "Label",
          {
            id: "label",
            // 详情禁用删除按钮
            cssClass: "fa fa-trash-o delete-connection",
            events: {
              click: function (labelOverlay: any, originalEvent: any): void {
                originalEvent.stopPropagation();
                deleteConnection(labelOverlay);
              },
            },
            visible: false,
          },
        ],
      ],
      EndpointHoverStyle: { fill: "#8F96B3" },
      Container: "Flow",
    });
    // 限制节点拖动区域
    // instance.setContainer("Flow");
    setJsPlumbInstance(instance);
    instanceRef.current = instance;
  }, [deleteConnection]);

  useEffect(() => {
    // 初始化实例
    initJsplumb();
    return (): void => {
      instanceRef.current.cleanupListeners();
      instanceRef.current = null;
    };
  }, [initJsplumb]);

  // 注册线监听事件
  useEffect(() => {
    if (jsPlumbInstance) {
      // 通知单击了连接。
      jsPlumbInstance.unbind();
      jsPlumbInstance.bind(
        "click",
        (connection: any, originalEvent: any): void => {
          originalEvent.stopPropagation();
          console.log(connection, "bind click");
          // 判断是否有选中的线
          if (currentLine) {
            currentLine.hideOverlay("label");
          }
          setCurrentLine(connection);
          // 显示线label
          connection.showOverlay("label");
          // connection.toggleType("selected");
        }
      );

      // 监听创建新连线
      jsPlumbInstance.bind("connection", (connection: any) => {
        console.log("bind connection");
        getAllConnections();
      });
    }
  }, [currentLine, getAllConnections, jsPlumbInstance]);

  /**
   * 最终绘制
   */
  const jsPlumbDemoLoaded = (instance: any): void => {
    // instance.fire("jsPlumbDemoLoaded", instance);
    instance.repaintEverything();
  };

  /**
   * 处理节点
   */
  const dealNode = useCallback((instance, node) => {
    if (instance) {
      console.log("dealNode");

      instance.draggable(node.id, { containment: "parent" });

      instance.addEndpoint(node.id, {
        uuid: `${node.id}-Top`,
        anchor: "Top",
        maxConnections: 1,
      });
      instance.addEndpoint(node.id, {
        uuid: `${node.id}-Bottom`,
        anchor: "Bottom",
        maxConnections: 1,
      });

      // 在节点上拖拽线
      instance.makeSource(node.id, {
        filter: ".align-item-connector",
        connectionType: "basic",
        anchor: "Bottom",
        extract: {
          action: "the-action",
        },
        maxConnections: 1,
        onMaxConnections: (info: any) => {
          console.log(info);
          // alert("Maximum connections (" + info.maxConnections + ") reached");
        },
        allowLoopback: false,
        // deleteEndpointsOnDetach: true,
      });

      instance.makeTarget(node.id, {
        allowLoopback: false,
        connectionType: "basic",
        anchor: "Top",
        maxConnections: 1,
        dropOptions: { hoverClass: "dragHover" },
        // deleteEndpointsOnDetach: true,
      });

      instance.fire("jsPlumbDemoNodeAdded", node.id);
    }
  }, []);

  /**
   * 创建节点
   */
  const createNode = useCallback(
    (instance, data): void => {
      console.log(instance, data, "createNode");
      if (instance) {
        // 删除所有端点
        // instance.deleteEveryEndpoint();
        jsPlumbDemoLoaded(instance);
        instance.batch(() => {
          data.forEach((node: any) => {
            // instance.deleteEndpoint(node.id);
            dealNode(instance, node);
          });
        });
      }
    },
    [dealNode]
  );

  // init node
  useEffect(() => {
    console.log("init node");
    if (jsPlumbInstance) {
      createNode(jsPlumbInstance, nodeData);
    }
  }, [createNode, jsPlumbInstance, nodeData]);

  /**
   * 处理连线
   */
  const dealConnection = useCallback((instance, connection) => {
    console.log("dealConnection");
    if (instance) {
      const conn = instance.connect({
        uuids: [`${connection.sourceId}-Bottom`, `${connection.targetId}-Top`],
      });
      if (conn) {
        conn.id = connection.id;
      }
    }
  }, []);

  // 创建连线
  const createConnection = useCallback(
    (instance, data) => {
      console.log("createConnection");
      if (instance) {
        // 删除所有连线 后再创建新连线
        instance.deleteEveryConnection();
        instance.batch(() => {
          data.forEach((item: any) => {
            dealConnection(instance, item);
          });
        });
      }
    },
    [dealConnection]
  );

  // init node line
  useEffect(() => {
    console.log("init line");
    if (jsPlumbInstance) {
      createConnection(jsPlumbInstance, props.connectionsData);
    }
  }, [createConnection, jsPlumbInstance, props.connectionsData]);

  // 初始化节点 线选中状态
  const initChoseStatus = useEventCallback(
    (e: any): void => {
      e.stopPropagation();
      e.persist();
      console.log(e, "initChoseStatus");
      if (!e || e.target.id === "Flow") {
        const data = cloneDeep(nodeData).map((item) => ({
          ...item,
          status: false,
        }));
        setNodeData(data);

        if (currentLine) {
          currentLine.hideOverlay("label");
          setCurrentLine(null);
        }
      }
    },
    [currentLine]
  );

  // 点击节点，显示选中状态
  const nodeMouseDown = (id: string, con: any): void => {
    console.log(id, con, "nodeMouseDown");
    const data = cloneDeep(nodeData).map((item) => ({
      ...item,
      status: false, // 先清除选中
    }));
    const item = data.find((item) => item.id === id);
    if (item) {
      item.x = con.x;
      item.y = con.y;
      item.status = true;
    }
    setNodeData(data);
  };

  return (
    <>
      <div
        id="Flow"
        className={canDrop ? "drapover-inner" : ""}
        ref={drop}
        onClick={(e): void => {
          initChoseStatus(e);
        }}
      >
        {nodeData.map((item) => {
          return (
            <FlowItem
              key={item.id}
              data={item}
              nodeMouseDown={nodeMouseDown}
              deleteNode={deleteNode}
            />
          );
        })}
      </div>
    </>
  );
};
export default Flow;
