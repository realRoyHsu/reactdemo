import G6 from "@antv/g6";
import { head } from "lodash";
import { styleConfig, imgStyleConfig } from "./../configs/index";

let graph: any;
const ERROR_COLOR = "#F5222D";
const getNodeConfig = (cfg: any): any => {
  const innerWidth = 80;
  let innerHeight = 30;
  const outerWidth = 100;
  let outerHeight = 50;
  let imgWidth = 0;
  let imgHeight = 0;
  if (cfg.img) {
    imgWidth = imgHeight = 40;
    innerHeight = 80;
    outerHeight = 90;
  }
  const config = {
    ...styleConfig,
    innerHeight,
    innerWidth,
    outerWidth,
    outerHeight,
    imgWidth,
    imgHeight,
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

// 绘制node
const options = {
  draw: (cfg: any, group: any): any => {
    console.log(cfg, group);
    const { showLeftEndPoint, showRightEndPoint, showDocker, img, label } = cfg;
    const config = getNodeConfig(cfg);

    const keyShape = group.addShape("rect", {
      attrs: {
        x: 0,
        y: 0,
        width: config.outerWidth,
        height: config.outerHeight,
        stroke: config.borderColor,
        fill: config.backgoundColor,
      },
      draggable: true,
      name: "node-contanier",
    });

    group.addShape("rect", {
      attrs: {
        x: (config.outerWidth - config.innerWidth) / 2,
        y: (config.outerHeight - config.innerHeight) / 2,
        width: config.innerWidth,
        height: config.innerHeight,
        fill: config.backgoundColor,
        stroke: config.borderColor,
        radius: config.radius,
        lineWidth: config.lineWidth,
        cursor: "pointer",
      },
      name: "node-shape",
      draggable: true,
    });

    // 创建文字 图片容器
    if (img) {
      group.addShape("rect", {
        attrs: {
          x: (config.outerWidth - config.imgWidth) / 2,
          y: (config.outerHeight - config.imgHeight - config.imgHeight / 4) / 2,
          width: config.imgWidth,
          height: config.imgHeight,
          radius: config.radius,
          fill: `l(${Math.PI / 4}) ${imgStyleConfig.startPoint}:${
            imgStyleConfig.fillStart
          } ${imgStyleConfig.endPoint}:${imgStyleConfig.fillEnd}`,
          cursor: "pointer",
        },
        draggable: true,
      });
      const imgIcon = group.addShape("path", {
        attrs: {
          path: img,
          fill: config.backgoundColor,
          cursor: "pointer",
        },
        name: "icon-shape",
        draggable: true,
      });
      imgIcon.translate(
        (config.outerWidth - config.imgWidth) / 2,
        (config.outerHeight - config.imgHeight - config.imgHeight / 4) / 2
      );
    }

    // label
    if (label) {
      group.addShape("text", {
        attrs: {
          x: config.outerWidth / 2,
          y: (config.outerHeight + config.imgHeight + config.imgHeight / 4) / 2,
          fill: config.fontColor,
          fontSize: config.fontSize,
          text: label,
          textBaseline: "middle",
          textAlign: "center",
          cursor: "pointer",
        },
        name: "label-shape",
        draggable: true,
      });
    }

    /* 左边的小圆点 */
    if (showLeftEndPoint) {
      group.addShape("circle", {
        attrs: {
          x: (config.outerWidth - config.innerWidth) / 2,
          y: config.outerHeight / 2,
          r: 6,
          stroke: config.borderColor,
          fill: "#fff",
          lineWidth: config.lineWidth,
        },
        name: "left-circle-shape",
      });
    }
    if (showRightEndPoint) {
      group.addShape("circle", {
        attrs: {
          x: (config.outerWidth + config.innerWidth) / 2,
          y: config.outerHeight / 2,
          r: 6,
          stroke: config.borderColor,
          fill: "#fff",
          lineWidth: config.lineWidth,
        },
        name: "right-circle-shape",
      });
    }
    // 原点 0 0
    group.addShape("circle", {
      attrs: {
        x: 0,
        y: 0,
        r: 6,
        stroke: "red",
        fill: "#fff",
        lineWidth: 6,
        zIndex: 999,
      },
      draggable: false,
      name: "0-contanier",
    });

    return keyShape;
  },
  // afterDraw: nodeBasicMethod.afterDraw,
  // setState: nodeBasicMethod.setState,
};
export default {
  type: "node",
  name: "app",
  options,
  extendShapeType: "single-node",
};
