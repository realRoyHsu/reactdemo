import React from "react";
import { NodeType } from ".";

interface Props {
  data: NodeType;
  nodeMouseDown: (key: string, con: any) => void;
  deleteNode: (id: string) => void;
}
const FlowItem: React.FC<Props> = (props) => {
  const { data } = props;
  console.log(data, "data");
  const nodeMouseDown = (e: any): void => {
    e.stopPropagation();
    e.persist();
    const { nativeEvent } = e;
    nativeEvent.path.forEach((item: any) => {
      const { parentNode } = item;
      if (parentNode && parentNode.id === "Flow") {
        const { offsetTop: y, offsetLeft: x } = item;
        props.nodeMouseDown(data.id, {
          x,
          y,
        });
      }
      return;
    });
  };

  return (
    <div
      id={data.id}
      className={data.status ? "viso-name viso-name-active" : "viso-name"}
      style={{ left: `${data.x}px`, top: `${data.y}px` }}
      onClick={nodeMouseDown}
    >
      <div className="viso-name-body">
        <div className="viso-name-icon">
          <i className="fu fu-mysql-b" style={{ verticalAlign: "top" }}></i>
        </div>
        <div className="viso-name-content">
          <div className="align-item-name">{data.name}</div>
        </div>
        <div className="viso-other">
          <div className="viso-index">{data.type}</div>
          <div className="viso-version">{data.key}</div>
        </div>
        {data.status && <div className="align-item-connector"></div>}
        {data.status && (
          <div
            className="align-item-delete"
            onClick={(e): void => {
              e.stopPropagation();
              props.deleteNode(data.id);
            }}
          >
            <i className="fa fa-trash-o"></i>
          </div>
        )}
      </div>
    </div>
  );
};
export default FlowItem;
