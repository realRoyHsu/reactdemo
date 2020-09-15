import G6 from "@antv/g6";
import { head } from "lodash";

let graph: any;
const ERROR_COLOR = "#F5222D";
const getNodeConfig = (cfg: any): any => {
  let outerWidth;
  let outerHeight;
  let innerWidth;
  let innerHeight;
  let offset;
  if (cfg.img) {
    offset = 10;
    outerHeight = 100;
    outerWidth = 90;
    innerHeight = innerWidth = 80;
  } else {
    offset = 10;
    outerWidth = 90;
    innerHeight = 30;
    innerWidth = 80;
    outerHeight = innerHeight + offset * 2;
  }
  const config = {
    basicColor: "#E3E6E8",
    fontColor: "#DDD",
    borderColor: "rgb(27, 133, 255)",
    bgColor: "#fff",
    radius: 4,
    lineWidth: 1.5,
    offset,
    innerHeight,
    innerWidth,
    outerWidth,
    outerHeight,
  };
  return config;
};

const COLLAPSE_ICON = function COLLAPSE_ICON(x: any, y: any, r: any): any {
  return [
    ["M", x - r, y],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x - r + 4, y],
    ["L", x - r + 2 * r - 4, y],
  ];
};
const EXPAND_ICON = function EXPAND_ICON(x: any, y: any, r: any): any {
  return [
    ["M", x - r, y],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x - r + 4, y],
    ["L", x - r + 2 * r - 4, y],
    ["M", x - r + r, y - r + 4],
    ["L", x, y + r - 4],
  ];
};

const nodeBasicMethod = {
  createNodeBox: (
    group: any,
    config: any,
    w: any,
    h: any,
    isRoot: any
  ): any => {
    /* 最外面的大矩形 */
    const container = group.addShape("rect", {
      attrs: {
        x: 0,
        y: 0,
        width: w,
        heigh: h,
      },
      // shadowOffsetX: 10,
      // shadowOffsetY: 10,
      // shadowColor: "blue",
      // shadowBlur: 10,
      // opacity: 0.8,
      draggable: true,
      name: "big-rect-shape",
    });

    /* 矩形 */
    group.addShape("rect", {
      attrs: {
        x: 3,
        y: 0,
        width: w - 19,
        height: h,
        fill: config.bgColor,
        stroke: config.borderColor,
        radius: 2,
        cursor: "pointer",
      },
      name: "rect-shape",
    });

    if (!isRoot) {
      /* 左边的小圆点 */
      group.addShape("circle", {
        attrs: {
          x: 3,
          y: h / 2,
          r: 6,
          stroke: config.basicColor,
          fill: "#fff",
        },
        name: "left-dot-shape",
      });
      group.addShape("circle", {
        attrs: {
          x: 228,
          y: h / 2,
          r: 6,
          stroke: config.basicColor,
          fill: "#fff",
        },
        name: "right-dot-shape",
        fill: "#fff",
      });
    }
    return container;
  },
  /* 生成树上的 marker */
  createNodeMarker: (group: any, collapsed: any, x: any, y: any): any => {
    group.addShape("circle", {
      attrs: {
        x,
        y,
        r: 13,
        fill: "rgba(47, 84, 235, 0.05)",
        opacity: 0,
        zIndex: -2,
      },
      name: "collapse-icon-bg",
    });
    group.addShape("marker", {
      attrs: {
        x,
        y,
        r: 7,
        symbol: collapsed ? EXPAND_ICON : COLLAPSE_ICON,
        stroke: "rgba(0,0,0,0.25)",
        fill: "rgba(0,0,0,0)",
        lineWidth: 1,
        cursor: "pointer",
      },
      name: "collapse-icon",
    });
  },
  afterDraw: (cfg: any, group: any): any => {
    /* 操作 marker 的背景色显示隐藏 */
    const icon = group.find(
      (element: any) => element.get("name") === "collapse-icon"
    );
    if (icon) {
      const bg = group.find(
        (element: any) => element.get("name") === "collapse-icon-bg"
      );
      icon.on("mouseenter", () => {
        bg.attr("opacity", 1);
        graph.get("canvas").draw();
      });
      icon.on("mouseleave", () => {
        bg.attr("opacity", 0);
        graph.get("canvas").draw();
      });
    }
    /* ip 显示 */
    const ipBox = group.find(
      (element: any) => element.get("name") === "ip-box"
    );
    if (ipBox) {
      /* ip 复制的几个元素 */
      const ipLine = group.find(
        (element: any) => element.get("name") === "ip-cp-line"
      );
      const ipBG = group.find(
        (element: any) => element.get("name") === "ip-cp-bg"
      );
      const ipIcon = group.find(
        (element: any) => element.get("name") === "ip-cp-icon"
      );
      const ipCPBox = group.find(
        (element: any) => element.get("name") === "ip-cp-box"
      );

      const onMouseEnter = (): void => {
        ipLine.attr("opacity", 1);
        ipBG.attr("opacity", 1);
        ipIcon.attr("opacity", 1);
        graph.get("canvas").draw();
      };
      const onMouseLeave = (): void => {
        ipLine.attr("opacity", 0);
        ipBG.attr("opacity", 0);
        ipIcon.attr("opacity", 0);
        graph.get("canvas").draw();
      };
      ipBox.on("mouseenter", () => {
        onMouseEnter();
      });
      ipBox.on("mouseleave", () => {
        onMouseLeave();
      });
      ipCPBox.on("mouseenter", () => {
        onMouseEnter();
      });
      ipCPBox.on("mouseleave", () => {
        onMouseLeave();
      });
      ipCPBox.on("click", () => {
        console.log("object");
      });
    }
  },
  setState: (name: any, value: any, item: any): any => {
    const hasOpacityClass = [
      "ip-cp-line",
      "ip-cp-bg",
      "ip-cp-icon",
      "ip-cp-box",
      "ip-box",
      "collapse-icon-bg",
    ];
    const group = item.getContainer();
    const childrens = group.get("children");
    graph.setAutoPaint(false);
    if (name === "emptiness") {
      if (value) {
        childrens.forEach((shape: any) => {
          if (hasOpacityClass.indexOf(shape.get("name")) > -1) {
            return;
          }
          shape.attr("opacity", 0.4);
        });
      } else {
        childrens.forEach((shape: any) => {
          if (hasOpacityClass.indexOf(shape.get("name")) > -1) {
            return;
          }
          shape.attr("opacity", 1);
        });
      }
    }
    graph.setAutoPaint(true);
  },
};

// 绘制node
const options = {
  draw: (cfg: any, group: any): any => {
    const {
      showLeftEndPoint,
      showRightEndPoint,
      showDocker,
      img,
      imgStyle,
      label,
    } = cfg;
    const fontSize = 12;
    const config = getNodeConfig(cfg);
    const imgStyleCfg = {
      fillStart: "#B7B7B7",
      startPoint: 0,
      endPoint: 1,
      fillEnd: "#D2D2D2",
    };

    const keyShape = group.addShape("rect", {
      attrs: {
        x: 0,
        y: 0,
        width: config.outerWidth,
        height: config.outerHeight,
      },
      draggable: true,
      name: "big-rect-shape",
    });

    group.addShape("rect", {
      attrs: {
        x: 5,
        y: config.offset,
        width: config.innerWidth,
        height: config.innerHeight,
        fill: config.bgColor,
        stroke: config.borderColor,
        radius: config.radius,
        lineWidth: config.lineWidth,
        cursor: "pointer",
      },
      name: "rect-shape",
      draggable: true,
    });

    if (showLeftEndPoint) {
      /* 左边的小圆点 */
      group.addShape("circle", {
        attrs: {
          x: 5,
          y: config.outerHeight / 2,
          r: 10,
          stroke: "transparent",
          fill: "transparent",
          opacity: 0.7,
          lineWidth: config.lineWidth,
        },
        name: "left-dot-shape",
      });
      group.addShape("circle", {
        attrs: {
          x: 5,
          y: config.outerHeight / 2,
          r: 6,
          stroke: config.borderColor,
          fill: "#fff",
          lineWidth: config.lineWidth,
        },
        name: "left-dot-shape",
      });
    }
    if (showRightEndPoint) {
      group.addShape("circle", {
        attrs: {
          x: 85,
          y: config.outerHeight / 2,
          r: 10,
          stroke: "transparent",
          fill: "transparent",
          opacity: 0.7,
          lineWidth: config.lineWidth,
        },
        name: "right-dot-shape",
        fill: "#fff",
      });
      group.addShape("circle", {
        attrs: {
          x: 85,
          y: config.outerHeight / 2,
          r: 6,
          stroke: config.borderColor,
          fill: "#fff",
          lineWidth: config.lineWidth,
        },
        name: "right-dot-shape",
        fill: "#fff",
      });
    }

    // logo
    if (img) {
      group.addShape("rect", {
        attrs: {
          radius: 4,
          x: 25,
          y: 25,
          width: 40,
          height: 40,
          fill: `l(${Math.PI / 4}) ${imgStyleCfg.startPoint}:${
            imgStyleCfg.fillStart
          } ${imgStyleCfg.endPoint}:${imgStyleCfg.fillEnd}`,
        },
        draggable: true,
      });
      const imgIcon = group.addShape("path", {
        attrs: {
          radius: 4,
          width: 40,
          height: 40,
          lineWidth: 5,
          path: img,
          ...imgStyle,
        },
        draggable: true,
      });
      imgIcon.translate(25, 25);
    }

    // label
    group.addShape("text", {
      attrs: {
        x: config.outerWidth / 2,
        y: config.innerHeight + config.offset - fontSize - 1,
        fill: "#666",
        fontSize,
        text: label,
        textBaseline: "middle",
        textAlign: "center",
      },
      draggable: true,
    });

    return keyShape;
  },
  // afterDraw: nodeBasicMethod.afterDraw,
  // setState: nodeBasicMethod.setState,
};
export default {
  type: "node",
  name: "service",
  options,
  extendShapeType: "rect",
};
