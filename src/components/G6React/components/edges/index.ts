import G6 from "@antv/g6";

const edgeTypeColorMap: any = {
  type1: ["#531dab", "#391085", "#391085"],
  type2: ["#d9d9d9", "#bfbfbf", "#8c8c8c"],
  type3: ["#d3adf7", "#b37feb", "#9254de"],
};

const options: Partial<any> = {
  style: {
    lineAppendWidth: 5,
    lineDash: [0, 0],
    lineDashOffset: 0,
    opacity: 1,
    labelCfg: {
      style: {
        fillOpacity: 1,
      },
    },
  },
  draw(cfg: any, group: any) {
    console.log(cfg, group);
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const shape = group.addShape("path", {
      attrs: {
        stroke: cfg.color,
        path: [
          ["M", startPoint.x, startPoint.y],
          ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
          ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
          ["L", endPoint.x, endPoint.y],
        ],
        // lineWidth: 3,
        // startArrow: {
        //   // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
        //   path: "M -10 4 L 0 0 L -10 -4 A 12 12 0 0 1 -10 4 Z",
        //   // 箭头的偏移量，负值代表向 x 轴正方向移动
        //   // d: -10,
        //   // v3.4.1 后支持各样式属性
        //   fill: "#333",
        //   stroke: "#666",
        //   opacity: 0.8,
        //   // ...
        // },
        endArrow: {
          // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
          path: "M -10 4 L 0 0 L -10 -4 A 12 12 0 0 1 -10 4 Z",
          // 箭头的偏移量，负值代表向 x 轴正方向移动
          // d: -10,
          // v3.4.1 后支持各样式属性
          fill: "rgb(163, 177, 191)",
          stroke: "rgb(163, 177, 191)",
          // opacity: 0.8,
          // ...
        },
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: "path-shape",
    });
    return shape;
  },

  /**
   * 绘制边
   * @override
   * @param  {Object} cfg   边的配置项
   * @param  {G.Group} group 边的容器
   * @return {G.Shape} 图形
   */
  drawShape(
    cfg: any,
    group: {
      get: (arg0: string) => any;
      addShape: (arg0: string, arg1: { className: string; attrs: any }) => any;
    }
  ): any {
    const item = group.get("item");
    const shapeStyle = this.getShapeStyle(cfg, item);
    const shape = group.addShape("path", {
      className: "edge-path",
      attrs: shapeStyle,
    });
    return shape;
  },
  drawLabel(
    cfg: { labelCfg: {}; label: any },
    group: {
      addShape: (arg0: string, arg1: { attrs: any; className: string }) => any;
    }
  ): any {
    const labelCfg = cfg.labelCfg || {};
    // const labelStyle = this.getLabelStyle(cfg, labelCfg, group);
    const text = group.addShape("text", {
      attrs: {
        // ...labelStyle,
        text: cfg.label,
        fontSize: 12,
        fill: "#404040",
        cursor: "pointer",
      },
      className: "edge-label",
    });

    return text;
  },

  /**
   * 获取图形的配置项
   * @internal 仅在定义这一类节点使用，用户创建和更新节点
   * @param  {Object} cfg 节点的配置项
   * @return {Object} 图形的配置项
   */
  getShapeStyle(
    cfg: { style?: any; startPoint?: any; endPoint?: any },
    item: { get: (arg0: string) => any }
  ): any {
    const { startPoint, endPoint } = cfg;
    const type = item.get("type");

    const defaultStyle = this.getStateStyle("default", true, item);

    if (type === "node") {
      return Object.assign({}, cfg.style, defaultStyle);
    }

    const controlPoints = this.getControlPoints(cfg);
    let points = [startPoint]; // 添加起始点
    // 添加控制点
    if (controlPoints) {
      points = points.concat(controlPoints);
    }
    // 添加结束点
    points.push(endPoint);
    const path = this.getPath(points);

    const style = Object.assign({}, { path }, cfg.style, defaultStyle);
    return style;
  },
  getControlPoints(cfg: {
    controlPoints?: any;
    edgeOffset?: any;
    startPoint?: any;
    endPoint?: any;
  }): any {
    let controlPoints = cfg.controlPoints; // 指定controlPoints

    if (!controlPoints || !controlPoints.length) {
      const { startPoint, endPoint } = cfg;
      const innerPoint = G6.Util.getControlPoint(
        startPoint,
        endPoint,
        0.5,
        cfg.edgeOffset || 30
      );
      controlPoints = [innerPoint];
    }
    return controlPoints;
  },
  /**
   * 获取三次贝塞尔曲线的path
   *
   * @param {array} points 起始点和两个控制点
   * @returns
   */
  getPath(points: any[]): any {
    const path = [];
    path.push(["M", points[0].x, points[0].y]);
    path.push(["Q", points[1].x, points[1].y, points[2].x, points[2].y]);
    return path;
  },
  /**
   * 根据不同状态，获取不同状态下的样式值
   * @param {string} name
   * @param {string} value
   * @param {Item} item
   */
  getStateStyle(name: string, value: boolean, item: any): any {
    const model = item.getModel();
    const { style = {} } = model;

    const defaultStyle = Object.assign({}, this.style);

    // 更新颜色
    return {
      ...defaultStyle,
      lineWidth: 1,
      stroke:
        edgeTypeColorMap[model.edgeType] && edgeTypeColorMap[model.edgeType][0],
      ...style,
    };
  },
};

export default {
  type: "edge",
  name: "polyline-round",
  options,
  extendShapeType: undefined,
};
