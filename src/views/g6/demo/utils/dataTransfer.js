// import { isDebuggerStatement } from 'typescript';
import { arrayJsonRepeatFilter } from "@/utils/common.js";
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

//判断服务类型
const fn = {
  isApp, //app
  isWeb, //web
  isNet, //网络服务
  isStrategy, //策略
  isDb,
  isCache,
  source: sourceServiceList,
  target: targetServiceList,
};
const serviceSort = {
  NginxKVM: 3,
  LB: 2,
  DNS: 1,
};
function formDataTransfer(components, links, editor) {
  //第一步:分组
  //拓扑图的起始点,左上角
  let serviceBox = {
    width: 180,
    height: 120,
  };
  const nodes = [];
  const allServiceList = ["DNS", "LB", "NginxKVM", "App"];
  let restNum = 0;
  let curRow = 0;
  let span = 0;
  const groupList = divideGroups(components, links);
  groupList.forEach((g, gIndex) => {
    //获取最大的列数,用去确定DB类服务的位置
    //组间隔
    span = gIndex;
    const groupId = editor.guid();

    let sortNodes = g.nodes.sort((a, b) => {
      if (isApp(a.type)) return 1;
      if (isApp(b.type)) return -1;
      if (a.type === b.type) {
        return allConnectServiceList(a, components, links, "target").some((s) =>
          isWeb(s.type)
        )
          ? -1
          : 1;
      }
      return serviceSort[a.type] - serviceSort[b.type];
    });
    const _nodes = sortNodes.concat();
    sortNodes = sortNodes.sort((a, b) => {
      if (a.type === b.type) {
        if (dnsIndex(a, _nodes, links) === -1) return 1;
        if (dnsIndex(b, _nodes, links) === -1) return -1;
      }
      return 0;
    });
    const list = [];
    const typeList = [...new Set([...sortNodes.map((n) => n.type)])];
    allServiceList.forEach((s) => {
      if (s === "App") {
        list.push(typeList[typeList.length - 1]);
      } else if (!typeList.includes(s)) {
        list.push("");
      } else {
        list.push(s);
      }
    });
    sortNodes.forEach((n, nIndex) => {
      let coordX = `${list.findIndex((t) => t === n.type) * serviceBox.width}`;
      let coordY = `${(curRow + gIndex + 1) * serviceBox.height}`;
      if (isNet(n.type)) {
        const webNode = sortNodes.find((node) => isWeb(node.type));
        const serviceNums = sortNodes.filter((node) => node.type === n.type)
          .length;
        if (restNum === 0) {
          restNum = serviceNums;
        }
        if (webNode) {
          // suengin上没连lb && 有lb/dns
          const webHasLb = sourceServiceList(webNode, components, links);
          coordY = `${
            (curRow + gIndex + 1 + (serviceNums - restNum)) * serviceBox.height
          }`;
          //web没连网络服务
          if (!webHasLb.length) {
            if (serviceNums > 0) {
              //向右移动,向下移动
              coordX = `${
                (list.findIndex((t) => t === n.type) + 1) * serviceBox.width
              }`;
              coordY = `${
                (curRow + gIndex + 1 + (serviceNums - restNum) + 1) *
                serviceBox.height
              }`;
            }
          } else {
            if (serviceNums > 1 && serviceNums > restNum) {
              coordX = nodes[nodes.length - 1].coordX;
              coordY = `${
                (curRow + gIndex + 1 + (serviceNums - restNum)) *
                serviceBox.height
              }`;
            }
          }
        } else {
          if (serviceNums) {
            if (serviceNums === restNum) {
              coordX = `${
                (list.findIndex((t) => t === n.type) + 1) * serviceBox.width
              }`;
            }
            if (serviceNums > restNum) {
              coordX = nodes[nodes.length - 1].coordX;
              coordY = `${
                (curRow + gIndex + 1 + (serviceNums - restNum)) *
                serviceBox.height
              }`;
            }
          }
        }
        restNum -= 1;
      }
      nodes.push({
        ...n,
        groupId,
        coordX,
        coordY,
      });
    });
    curRow += g.rows;
  });
  const strategyList = components.filter((c) => isStrategy(c.type));
  nodes.push(...strategyList);

  const dbAndCacheList = components.filter(
    (c) => isDb(c.type) || isCache(c.type)
  );
  dbAndCacheList.forEach((d, dIndex) => {
    const coordX = `${allServiceList.length * serviceBox.width + 200}`;
    const coordY = `${(dIndex + 1) * serviceBox.height}`;
    nodes.push({
      ...d,
      coordY,
      coordX,
      groupId: "",
    });
  });
  const ECSPPTV = components.filter((c) => ["CommonService"].includes(c.type));
  ECSPPTV.forEach((n, index) => {
    const coordX = `${(allServiceList.length + 1) * serviceBox.width + 200}`;
    const coordY = `${(index + 1) * serviceBox.height}`;
    nodes.push({
      ...n,
      coordY,
      coordX,
      groupId: "",
    });
  });
  return nodes;
}
//LB排序
function dnsIndex(lb, nodes, links) {
  try {
    if (lb.type !== "LB") return -2;
    const linkObj = links.find((l) => [lb.uuid, lb.nodeId].includes(l.to));
    if (!linkObj) return -1;
    return nodes.findIndex((n) => [n.uuid, n.nodeId].includes(linkObj.from));
  } catch (error) {
    return -1;
  }
}

//分组
function divideGroups(components, links) {
  //找到组的中心
  const groups = components
    .filter((c) => isApp(c.type))
    .map((c) => {
      let nodes = [c, ...allConnectServiceList(c, components, links, "source")];
      const notLinkNodes = components.filter(
        (n) =>
          (isNet(n.type) || isWeb(n.type)) &&
          n.groupId &&
          n.groupId === c.groupId &&
          n.type !== c.type
      );
      // notLinkNodes 未关联的服务添加到nodes里面会导致重复服务， kvm迁移docker
      // nodes = [...new Set([...nodes, ...notLinkNodes])];
      nodes = arrayJsonRepeatFilter([...nodes, ...notLinkNodes], "uuid");
      //有没接网络的Suengin,行数+1
      const noNetWeb = nodes.filter(
        (n) => isWeb(n.type) && !sourceServiceList(n, components, links).length
      );
      return {
        nodes,
        rows:
          nodes.filter((n) => n.type === "LB").length + noNetWeb.length || 1,
        cols: new Set(nodes.map((n) => n.type)).size,
      };
    });
  return groups;
}
//找出服务的所有上游/下游服务-穿透查找
function allConnectServiceList(component, components, links, direct) {
  const allList = [];
  const serviceList = fn[direct](component, components, links);
  allList.push(...serviceList);
  //当前的服务集合
  let curServiceList = [...serviceList];
  while (curServiceList.length) {
    let list = [];
    curServiceList.forEach((s) => {
      list.push(...fn[direct](s, components, links));
    });
    curServiceList = [...list];
    allList.push(...curServiceList);
  }
  return allList;
}
/**
 * 获取服务的上游服务-直属上游
 * @param {*} component
 * @param {*} components
 * @param {*} links
 */
function sourceServiceList(component, components, links) {
  let list = [];
  const fromUuids = links
    .filter((l) => [component.uuid, component.nodeId].includes(l.to))
    .map((l) => l.from);
  list = components.filter(
    (c) => fromUuids.includes(c.uuid) || fromUuids.includes(c.nodeId)
  );
  return list;
}

//获取服务的下游服务-直属下游
function targetServiceList(component, components, links) {
  let list = [];
  const toUuids = links
    .filter((l) => [component.uuid, component.nodeId].includes(l.from))
    .map((l) => l.to);
  list = components.filter(
    (c) => toUuids.includes(c.uuid) || toUuids.includes(c.nodeId)
  );
  return list;
}
export default formDataTransfer;
