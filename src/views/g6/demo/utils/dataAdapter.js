import { Util } from "@antv/g6";
const linkNode = {
  groupServiceMapList: [
    {
      type: "JbossStandaloneKVM",
      index: 4,
      rootApp: true,
      categoryRoot: true,
    },
    {
      type: "TomcatDocker",
      index: 4,
      rootApp: true,
      categoryRoot: true,
    },
    {
      type: "NODEJS",
      index: 4,
      rootApp: true,
      categoryRoot: true,
    },
    {
      type: "GO",
      index: 4,
      rootApp: true,
      categoryRoot: true,
    },
    {
      type: "JbossStandaloneKVMAI",
      index: 4,
      rootApp: true,
      categoryRoot: true,
    },
    {
      type: "NginxKVM",
      index: 3,
      rootApp: false,
      categoryRoot: true,
    },
    {
      type: "NginxDocker",
      index: 4,
      rootApp: true,
      categoryRoot: true,
    },
    {
      type: "NCM",
      index: 1,
      rootApp: false,
    },
    {
      type: "WAF",
      index: 2,
      rootApp: false,
    },
    {
      type: "DNS",
      index: 0,
      rootApp: false,
    },
  ],
  dbServiceMapList: [
    {
      type: "DB2",
    },
    {
      type: "SNRS",
    },
    {
      type: "NGMySQL",
    },
    {
      type: "PostgreSQL",
    },
  ],
  otherMapList: [
    {
      type: "vm",
    },
    {
      type: "CommonService",
    },
  ],
  maxLengthInGroup: 5,
  componentFilter(value, index, com) {
    return value;
  },
  linkFilter(value, index, comp) {
    return value.type !== 0;
  },
};
class DataAdapter {
  constructor(editor) {
    this.options = {
      /**
       * horizontal offset
       * @type {number}
       */
      dx: 15,
      /**
       * vertical offset
       * @type {number}
       */
      dy: 15,
      /**
       * node width
       * @type {number}
       */
      nodeWidth: 90,
      /**
       * node height
       * @type {number}
       */
      nodeHeight: 100,
      /**
       * node offset 偏置
       * @type {number}
       */
      nodeOffsetX: 40,
      nodeOffsetY: 80,
      categoryOffset: -10,
      categoryWidth: 80,
      categoryHeight: 40,
      defaultStartX: 300,
      defaultStartY: 100,
      ...linkNode,
    };
    this.editor = editor;
  }
  wrapData(components, links) {
    const editor = this.editor;
    /*
     * 首先将数据按类型的进行分块
     * */
    const guid = this.editor.guid;
    const options = this.options;
    components = components.filter(
      options.componentFilter || ((value) => value)
    );
    links = links.filter(options.linkFilter || ((value) => value));
    const appMapList = options.groupServiceMapList.filter(
      (v) => v.rootApp === true
    );
    const categoryMapList = options.groupServiceMapList.filter(
      (v) => v.categoryRoot === true
    );
    const categoryRootTypeList = categoryMapList.reduce((pre, v, index) => {
      v.categoryRoot && pre.push(v.type);
      return pre;
    }, []);
    const appTypeList = appMapList.reduce((pre, v, index) => {
      v.rootApp && pre.push(v.type);
      return pre;
    }, []);
    const groupServiceTypeList = options.groupServiceMapList.reduce(
      (pre, v, index) => {
        pre.push(v.type);
        return pre;
      },
      []
    );
    const dbServiceMapList = options.dbServiceMapList;
    const dbServiceTypeList = dbServiceMapList.reduce((pre, v, index) => {
      pre.push(v.type);
      return pre;
    }, []);
    const otherMapList = options.otherMapList;
    const otherTypeList = otherMapList.reduce((pre, v, index) => {
      pre.push(v.type);
      return pre;
    }, []);
    /*
     * 拆分所有服务
     * */
    const groupList = [];
    const dblist = [];
    const otherList = [];
    const appList = [];
    const maxLengthInGroup = options.maxLengthInGroup || 5;
    components.forEach((v) => {
      if (appTypeList.includes(v.type)) {
        appList.push(v);
      } else if (groupServiceTypeList.includes(v.type)) {
        groupList.push(v);
      } else if (dbServiceTypeList.includes(v.type)) {
        dblist.push(v);
      } else if (otherTypeList.includes(v.type)) {
        otherList.push(v);
      }
    });
    let matrix = createMatrix(appList.concat(groupList));
    // 矫正矩阵
    correctMatrixByLinks(matrix, links);
    // console.log(matrix);
    return attachPosition(matrix, otherList, dblist, links);
    /**
     * @param groupMatrix
     * @param otherList
     * @param dbList
     */
    function attachPosition(groupMatrix, otherList, dbList, links) {
      let xTick = 0;
      let yTick = 0;
      let toggleOtherList = [];
      let groups = [];
      let maxX = 0;
      let nodes = [];
      let edges = [];
      let categoryOffsetCollection = [];
      // 首先将otherList进行重新编排
      while (otherList.length) {
        toggleOtherList.push(otherList.splice(0, 5));
      }
      // 处理groupMatrix
      if (groupMatrix.length) {
        let gid;
        let appuid;
        let shouldChangeUid = true;
        groupMatrix.forEach((groupLine, matrixY) => {
          if (shouldChangeUid) {
            gid = guid();
            groups.push({
              collapsed: false,
              id: gid,
              label: "...",
              type: "region",
            });
          }
          xTick = 0;
          yTick++;
          let categoryOffset = categoryOffsetCollection.reduce(
            (previousValue, currentValue, currentIndex) =>
              +previousValue + currentValue,
            0
          );
          let maxCateTick = -1;
          groupLine.forEach((item, matrixX) => {
            let nextLineHasApp =
              groupMatrix[matrixY + 1] &&
              groupMatrix[matrixY + 1].some((item, itemIndex) => {
                return item && appTypeList.includes(item.type);
              });
            if (nextLineHasApp) {
              shouldChangeUid = true;
            } else {
              shouldChangeUid = false;
            }
            if (!item) {
              item = null;
              return;
            }
            let data = JSON.parse(item.data);
            let isApp = appTypeList.includes(item.type);
            let isCategoryRoot = categoryRootTypeList.includes(item.type);
            let nextLineISApp =
              groupMatrix[matrixY + 1] &&
              groupMatrix[matrixY + 1][matrixX] &&
              appTypeList.includes(groupMatrix[matrixY + 1][matrixX].type);
            item.id = item.uuid;
            item.x =
              options.defaultStartX +
              xTick * (options.nodeWidth + options.nodeOffsetX);
            item.y =
              categoryOffset +
              options.defaultStartY +
              yTick * (options.nodeHeight + options.nodeOffsetY);
            item.parent = gid;
            item.showAnchor = true;
            item.img = "init";
            item.label = data.aliasName;
            if (isCategoryRoot) {
              appuid = guid();
              groups.push({
                parent: gid,
                id: appuid,
                style: {
                  fill: "rgb(27, 133, 255, 0.4)",
                },
                collapsed: false,
                type: "app",
              });
              // 改写父级的id
              item.parent = appuid;
              let categoryData = data.rely;
              let cateTick;
              categoryData &&
                categoryData.forEach((category, cateIndex) => {
                  category.parent = appuid;
                  category.x =
                    options.defaultStartX +
                    xTick * (options.nodeWidth + options.nodeOffsetX);
                  category.y =
                    categoryOffset +
                    options.defaultStartY +
                    yTick * (options.nodeHeight + options.nodeOffsetY) +
                    options.nodeHeight +
                    options.categoryOffset +
                    cateIndex * options.categoryHeight;
                  category.label = category.name;
                  cateTick = cateIndex;
                  nodes.push(category);
                });
              cateTick > maxCateTick ? (maxCateTick = cateTick) : void 0;
              /* categoryOffsetCollection.push(options.nodeHeight + options.categoryOffset + cateTick * (options.categoryHeight)); */
              maxCateTick > -1 &&
                (categoryOffsetCollection[matrixY] =
                  (maxCateTick + 1) * options.categoryHeight +
                  options.categoryOffset);
            }
            if (groupLine[matrixX]) xTick++;
            if (xTick > maxX) maxX = xTick;
          });
        });
      }
      xTick = 0;
      //  处理otherlist
      let categoryOffset = categoryOffsetCollection.reduce(
        (previousValue, currentValue, currentIndex) =>
          +previousValue + currentValue,
        0
      );
      toggleOtherList.forEach((otherLine) => {
        xTick = 0;
        yTick++;
        otherLine.forEach((item) => {
          let data = JSON.parse(item.data);
          item.id = item.uuid;
          item.label = data.aliasName;
          item.x =
            options.defaultStartX +
            xTick * (options.nodeWidth + options.nodeOffsetX);
          item.y =
            categoryOffset +
            options.defaultStartY +
            yTick * (options.nodeHeight + options.nodeOffsetY);
          xTick++;
        });
      });
      xTick = maxX + 2;
      yTick = 1;
      dbList.forEach((dbItem) => {
        let data = JSON.parse(dbItem.data);
        dbItem.label = data.aliasName;
        dbItem.id = dbItem.uuid;
        dbItem.x =
          options.defaultStartX +
          xTick * (options.nodeWidth + options.nodeOffsetX);
        dbItem.y =
          options.defaultStartY +
          yTick * (options.nodeHeight + options.nodeOffsetY);
        yTick++;
      });
      nodes = nodes
        .concat(...toggleOtherList, ...groupMatrix, dbList)
        .filter((v) => v);
      edges = links
        .map((link) => {
          link.source = link.from;
          link.target = link.to;
          link.endArrow = true;
          link.sourceAnchor = 1;
          link.targetAnchor = 0;
          return link;
        })
        .filter((link) => {
          return link.type !== 2;
        });
      return {
        nodes,
        edges,
        combos: groups,
      };
    }
    /*
     * 创建二维矩阵并且填充
     * */
    function createMatrix(data) {
      let matrix = [];
      data.forEach((service) => {
        // 查找出当前服务的index配置信息,
        let currentIndex = options.groupServiceMapList.find(
          (v) => v.type === service.type
        ).index;
        fillMatrix(matrix, service, currentIndex, maxLengthInGroup);
      });
      return matrix;
    }
    function fillMatrix(matrix, service, currentIndex, maxLengthInGroup) {
      let matrixYLength = matrix.length; // vertical方向的深度
      let lineIndex;
      if (matrixYLength === 0) {
        let hovLine = new Array(maxLengthInGroup);
        hovLine[currentIndex] = service;
        matrix.push(hovLine);
      } else {
        for (lineIndex = 0; lineIndex < matrixYLength; lineIndex++) {
          // 查看当前的位置是否有空位
          let currentLine = matrix[lineIndex];
          if (!currentLine[currentIndex]) {
            currentLine[currentIndex] = service;
            break;
          }
        }
        // 循环结束,没有找到
        if (lineIndex >= matrixYLength) {
          let hovLine = new Array(maxLengthInGroup);
          hovLine[currentIndex] = service;
          matrix.push(hovLine);
        }
      }
    }
    function correctMatrixByLinks(matrix, links) {
      let matrixYLength = matrix.length;
      // 逐行从后向前矫正
      for (let i = 0; i < matrix.length; i++) {
        let currentLine = matrix[i];
        for (let j = maxLengthInGroup - 1; j > 0; j--) {
          let currentItem = currentLine[j];
          if (!currentItem) continue;
          // 根据当前的项目去查找线条
          let edges = links.filter((link) => link.to === currentItem.uuid);
          if (!edges.length) continue;
          // 根据edges获取前一个节点的坐标（X，Y）
          let correctPoint = { x: j - 1, y: i };
          let points = findPointsInMatrixByEdges(edges, matrix);
          // 比较当前的correctPoint
          correctItem(correctPoint, points, matrix);
        }
      }
    }
    function findPointsInMatrixByEdges(edges, matrix) {
      let points = [];
      edges.forEach((edge) => {
        matrix.forEach((line, matrixY) => {
          line.forEach((item, matrixX) => {
            if (item && item.uuid === edge.from) {
              points.push({ x: matrixX, y: matrixY });
            }
          });
        });
      });
      return points;
    }
    function correctItem(correctPoint, points) {
      /*
       * 2020-01-14 修复DNS不在一个组内的问题
       * */
      let { x, y } = correctPoint; // 理论当前点坐标
      points = points.sort((a, b) => a.y - b.y);
      /*
       * 修复4Lb多组的问题，暂时方案，后期需要重构解析算法
       * */
      if (points[0].y < y) {
        points.reverse();
      }
      let tempY = y;
      points.forEach((point) => {
        if (point.y === y) {
          tempY++; // 将需要比较的行数++
          return;
        }
        if (point.y === y && tempY !== y) {
          createNewLine({ x, y: tempY }, point);
        }
        if (point.y !== y && tempY === y) {
          // 不在正确位置，且没有交换过
          exchangeItems({ x, y }, point);
          tempY++;
          return;
        }
        if (point.y !== y && tempY !== y) {
          // 新插入一行
          createNewLine({ x, y: tempY }, point);
          // exchangeLines({ x, y: tempY }, point);
        }
      });
    }
    function createNewLine(sourceItem, targetItem) {
      let { x: sourceX, y: sourceY } = sourceItem;
      let { x, y } = targetItem;
      let tempLine = matrix[y];
      let point = tempLine.splice(x, 1, undefined)[0];
      let newLine = new Array(maxLengthInGroup);
      newLine[x] = point;
      matrix.splice(sourceY, 0, newLine);
    }
    /*
     * 交换两个项目的信息
     * */
    function exchangeItems(sourceItem, targetItem) {
      let tempItem = matrix[sourceItem.y][sourceItem.x];
      matrix[sourceItem.y][sourceItem.x] = matrix[targetItem.y][targetItem.x];
      matrix[targetItem.y][targetItem.x] = tempItem;
    }
    /*
     * 交换行的信息
     * */
    function exchangeLines(sourceItem, targetItem) {
      let { y } = sourceItem;
      let tempLine = matrix[y];
      matrix[y] = matrix[targetItem.y];
      matrix[targetItem.y] = tempLine;
    }
  }
}
export default DataAdapter;
