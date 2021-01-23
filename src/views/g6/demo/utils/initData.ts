import formDataTransfer from "./dataTransfer";
import { allMenuMap } from "../content/data";
import servicePath from "../model/serviceSvgPath";
import {
  isCache,
  isDb,
  isApp,
  isWeb,
  isNet,
  isStrategy,
  isCommon,
  isCustomization,
  isData,
} from "./serviceTypeCheck";

function checkJsonParse(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 *数据转换
 *
 */
function initWrapperData(
  topoData: {
    ros_file: { components: any; links: any; graphInfo: any; showLinks: any };
  },
  editor: { guid: () => any }
) {
  const {
    ros_file: { components, links, graphInfo, showLinks },
  } = topoData;
  let wrapperData = null;
  let graphComponents = [];
  let graphLinks: any[] = [];
  const fakeNcmList: {
    uuid: any;
    aliasName: any;
    index: number;
    instanceCode: any;
    wafUuid: any;
  }[] = [];
  // if(components.some(component=>component.))
  const hasNet = components.some(
    (component: { type: string }) => component.type === "NCM"
  );
  // 有网络服务--新连线
  if (hasNet) {
    const ncmList = components.filter(
      (component: { type: string }) => component.type === "NCM"
    );
    graphComponents = components.filter(
      (component: { type: string }) => !["NCM", "WAF"].includes(component.type)
    );
    ncmList.forEach(
      (ncm: {
        data: string;
        type: any;
        instanceCode: any;
        uuid: any;
        nodeId: any;
        actionStatus: any;
        configStatus: any;
      }) => {
        let data = {
          isReal: 0,
        };
        if (checkJsonParse(ncm.data)) {
          data = JSON.parse(ncm.data);
        }
        if ([1, null, undefined].includes(data.isReal)) {
          graphComponents.push({
            ...ncm,
            lbType: ncm.type,
            ncmInstanceCode: ncm.instanceCode,
            type: "LB",
          });
        } else {
          const linkObj = links.find((link: { from: any }) =>
            [ncm.uuid, ncm.nodeId].includes(link.from)
          );
          if (linkObj) {
            const waf = components.find(
              (component: { type: string; uuid: any; nodeId: any }) =>
                component.type === "WAF" &&
                [component.uuid, component.nodeId].includes(linkObj.to)
            );
            if (waf) {
              graphComponents.push({
                ...waf,
                ncmUuid: ncm.uuid,
                ncmActionStatus: ncm.actionStatus,
                ncmConfigStatus: ncm.configStatus,
                ncmInstanceCode: ncm.instanceCode,
                lbType: waf.type,
                type: "LB",
              });

              try {
                const { aliasName } = JSON.parse(ncm.data);
                const nameAttr = aliasName.split("_");
                fakeNcmList.push({
                  uuid: ncm.uuid,
                  aliasName,
                  index: Number(nameAttr[1]),
                  instanceCode: ncm.instanceCode,
                  wafUuid: waf.uuid,
                });
              } catch (e) {
                console.log(e);
              }
            } else {
              graphComponents.push({
                ...ncm,
                lbType: ncm.type,
                ncmInstanceCode: ncm.instanceCode,
                type: "LB",
              });
            }
          } else {
            graphComponents.push({
              ...ncm,
              lbType: ncm.type,
              type: "LB",
            });
          }
        }
      }
    );
    // 写入store所有的虚NCM
    // store.commit("envInfoStore/setFakeNcmList", fakeNcmList);

    graphLinks = showLinks;
  } else {
    graphComponents = components;
    graphLinks = links;
  }
  const initDataSwitch = true;
  // store.commit('envInfoStore/delFakeNcmList', uuids);
  const isErrData = graphComponents.some(
    (c: { type: string; coordX: any; coordY: any; groupId: any }) => {
      const typeList = [
        isStrategy(c.type),
        isApp(c.type),
        isWeb(c.type),
        isNet(c.type),
      ];
      return (
        c.type !== "LB" &&
        (!c.coordX || !c.coordY) &&
        typeList.some((t) => t) &&
        !c.groupId
      );
    }
  );
  if (initDataSwitch || isErrData) {
    graphComponents = formDataTransfer(graphComponents, graphLinks, editor);
  }
  if (isErrData || (graphInfo && graphInfo.graphInfo) || !graphInfo) {
    const groups: {
      collapsed: boolean;
      shape: string;
      id: any;
      parent?: any;
      showLocation?: any;
      uuid: any;
      childId: any;
      childUuid: any;
    }[] = [];
    const nodes: {
      x: any;
      y: number;
      showAnchor: boolean;
      service: any;
      label?: string;
      id: any;
      shape: string;
      img: any;
      parent: any;
      showLeft: boolean;
      showRight: boolean;
      uuid: any;
      showDocker: boolean;
      model: {} | {};
    }[] = [];
    const edges: {
      endArrow: boolean;
      source: any;
      target: any;
      sourceAnchor: number;
      targetAnchor: number;
      color: string;
      id: any;
      shape: string;
      lineAppendWidth: number;
      index: number;
    }[] = [];

    const serviceMap: { [key: string]: any } = allMenuMap.serviceMap;
    graphComponents.forEach(
      (component: {
        type: string;
        groupId: any;
        uuid: any;
        nodeId: any;
        data: string;
        coordX: any;
        coordY: any;
      }) => {
        const isStrategy = [
          "LOGBACK",
          "PUBLICNETAGENT",
          "SPM",
          "LOGCOLLECT",
          "AtlasSLGS",
        ].includes(component.type);
        const service = {
          ...serviceMap[component.type],
        };
        service.formData = {
          ...component,
        };
        const imagPath = !isStrategy ? servicePath[component.type] || "" : "";
        let appGroup: any = null;
        if (!isStrategy) {
          const isRegion = ["0", 0].includes(service.showLocation);
          const isGroup =
            !isStrategy && ![2, "2"].includes(service.showLocation);
          if (isGroup) {
            appGroup = {
              collapsed: false,
              shape: "app",
              id: editor.guid(),
              parent: component.groupId,
              showLocation: service.showLocation,
              uuid: component.uuid,
              childId: component.nodeId,
              childUuid: component.uuid,
            };
            groups.push(appGroup);
            if (isRegion) {
              const regionGroup = {
                shape: "region",
                collapsed: false,
                id: component.groupId,
                uuid: component.uuid,
                childId: component.nodeId,
                childUuid: component.uuid,
              };
              groups.push(regionGroup);
            }
          }
          let label = "";
          if (checkJsonParse(component.data)) {
            label = JSON.parse(component.data).aliasName;
          }
          const node = {
            x: Number(component.coordX),
            y: Number(component.coordY),
            showAnchor: true,
            service,
            label,
            id: component.uuid || component.nodeId,
            shape: "service",
            img: imagPath,
            parent: appGroup ? appGroup.id : "",
            showLeft: false,
            showRight: false,
            uuid: component.uuid,
            showDocker: false,
            model: {},
          };
          nodes.push(node);
        }
      }
    );
    // // 策略类节点
    const strategyNodes = graphComponents.filter(
      (component: { type: string }) =>
        [
          "LOGBACK",
          "PUBLICNETAGENT",
          "SPM",
          "LOGCOLLECT",
          "AtlasSLGS",
        ].includes(component.type)
    );
    strategyNodes.forEach(
      (strategyNode: { uuid: any; nodeId: any; type: string | number }) => {
        const linkObj = graphLinks.find((link) =>
          [strategyNode.uuid, strategyNode.nodeId].includes(link.to)
        );
        const service = {
          ...serviceMap[strategyNode.type],
        };
        if (linkObj) {
          service.formData = {
            ...strategyNode,
          };
          const fromNode: any = nodes.find((node) =>
            [node.id, node.uuid].includes(linkObj.from)
          );

          const minX = fromNode.x;
          const maxY = fromNode.y + 100;

          const appGroup: any = groups.find(
            (group) => group.id === fromNode.parent
          );
          const appStrategys = graphLinks.filter(
            (link) =>
              link.type === 2 &&
              link.from === linkObj.from &&
              strategyNodes.some((node: { nodeId: any; uuid: any }) =>
                [node.nodeId, node.uuid].includes(link.to)
              )
          );
          const strategyIndex = appStrategys.findIndex((link) =>
            [strategyNode.uuid, strategyNode.nodeId].includes(link.to)
          );
          const node = {
            x: minX,
            y: Number(maxY) - 10 + strategyIndex * 40,
            showAnchor: false,
            service,
            id: strategyNode.uuid || strategyNode.nodeId || editor.guid(),
            shape: "service",
            img: "",
            parent: appGroup.id,
            showLeft: false,
            showRight: false,
            uuid: strategyNode.uuid,
            showDocker: false,
            model: {},
          };
          nodes.push(node);
        }
      }
    );
    // nodes = [...nodes, ...strategyNodes];
    // _graphLinks:带画布信息的连线关系
    // eslint-disable-next-line no-underscore-dangle
    let _graphLinks: any[] = [];
    try {
      _graphLinks =
        (graphInfo.graphInfo && JSON.parse(graphInfo.graphInfo).edges) || [];
    } catch (e) {
      console.log(e);
      _graphLinks = [];
    }
    graphLinks.forEach((link: { from: any; to: any; type?: any }) => {
      // eslint-disable-next-line no-underscore-dangle
      const _link = _graphLinks.find(
        (item) => item.from === link.from && item.to === link.to
      );
      let sourceAnchor = 1;
      let targetAnchor = 0;
      if (_link) {
        sourceAnchor = _link.sourceAnchor;
        targetAnchor = _link.targetAnchor;
      }
      if (link.type !== 2) {
        const { from, to } = link;
        const edge = {
          endArrow: true,
          source: from,
          target: to,
          sourceAnchor,
          targetAnchor,
          color: "#AAB7C4",
          id: editor.guid(),
          shape: "polyline-round",
          lineAppendWidth: 5,
          index: 14,
        };
        edges.push(edge);
      }
    });
    const regionUuids = groups
      .filter((group) => group.shape === "region")
      .map((region) => ({
        uuid: region.uuid,
        id: region.id,
        childId: region.childId,
        childUuid: region.childUuid,
      }));
    const regionUuidMap: { [key: string]: any } = {};
    regionUuids.forEach((uuid: any) => {
      regionUuidMap[uuid] = [];
    });
    wrapperData = {
      groups,
      nodes,
      edges,
    };
  }
  // else {
  //   const _graphComponents = graphComponents.map(c => ({ ...c }));
  //   const strategyNodes = _graphComponents.filter(component =>
  //     ['LOGBACK', 'PUBLICNETAGENT', 'SPM', 'LOGCOLLECT'].includes(component.type));
  //   strategyNodes.forEach(n => {
  //     try {
  //       const { uuid, data } = n;
  //       if (!data.rely) {
  //         const linkObj = graphLinks.find(l => l.to === uuid);
  //         if (linkObj) {
  //           const index = _graphComponents.findIndex(c => c.uuid === linkObj.from);
  //           const c = { ..._graphComponents[index] };
  //           const relyData = JSON.parse(c.data);
  //           if (!relyData.rely) {
  //             relyData.rely = [];
  //           }
  //           if (!relyData.rely.some(r => r.uuid === n.uuid)) {
  //             relyData.rely.push(n);
  //             _graphComponents[index].data = JSON.stringify(relyData);
  //           }
  //         }
  //       }
  //     } catch (e) {
  //     }
  //   })
  //   wrapperData = editor.wrapData(_graphComponents, graphLinks);
  //   wrapperData.nodes = wrapperData.nodes.map(node => ({
  //     ...node,
  //     service: { formData: { ...node } },
  //   }));
  // }
  return wrapperData;
}

export default initWrapperData;
