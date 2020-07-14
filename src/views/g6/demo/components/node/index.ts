import G6 from "@antv/g6";

/**
 * create by zhaiyu
 * 2019/7/8
 */
const options = {
  options: {
    style: {},
    stateStyles: {
      hover: {},
      selected: {},
    },
  },
  /**
   * 绘制节点，包含文本
   * @param  {Object} cfg 节点的配置项
   * @param  {G.Group} group 节点的容器
   * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 node.get('keyShape') 可以获取。
   * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
   */
  draw(cfg: any, group: any): any {
    // const stroke = cfg.style ? cfg.style.stroke || "#5B8FF9" : "#5B8FF9";
    // const shape = group.addShape("dom", {
    //   attrs: {
    //     width: cfg.size[0],
    //     height: cfg.size[1],
    //     html: `
    //     <div id=${
    //       cfg.id
    //     } class='dom-node' style="background-color: #fff; border: 2px solid ${stroke}; border-radius: 5px; width: ${
    //       cfg.size[0] - 5
    //     }px; height: ${cfg.size[1] - 5}px; display: flex;">
    //       <div style="height: 100%; width: 33%; background-color: #CDDDFD">
    //         <img alt="" style="line-height: 100%; margin-left: 7px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />
    //       </div>
    //       <span style="margin:auto; padding:auto; color: #5B8FF9">${
    //         cfg.label
    //       }</span>
    //     </div>
    //       `,
    //   },
    //   draggable: true,
    // });
    // return shape;

    console.log(cfg, group);
    const dockerPath = {
      path:
        "M40.1666666,116.028646 C34.4666666,116.028646 29.3,111.361979 29.3,105.695313 C29.3,100.028646 33.9666666,95.3369791 40.175,95.3369791 C46.4083334,95.3369791 51.0916666,100.003646 51.0916666,105.686979 C51.0916666,111.370312 45.9083332,116.020313 40.2166666,116.020313 L40.1666666,116.028646 Z M173.6,59.6703125 C172.475,51.4036459 167.35,44.6703125 160.6,39.5036459 L157.975,37.4203125 L155.858333,40.0036459 C151.741667,44.6703125 150.108333,52.9453125 150.608333,59.1286459 C151.108333,63.8119793 152.608333,68.4619793 155.225,72.0786459 C153.108333,73.1619793 150.491667,74.1619793 148.475,75.2203125 C143.951008,76.6642948 139.223418,77.3678053 134.475,77.3036459 L0.808333398,77.3036459 L0.308333398,80.3869791 C-0.724992033,90.4603356 0.889346091,100.628943 4.9916666,109.886979 L7.025,113.511979 L7.025,114.011979 C19.525,134.703646 41.775,144.011979 66.0083334,144.011979 C112.625,144.011979 150.858333,123.845312 168.983333,80.4036459 C180.858333,80.9203125 192.85,77.8203125 198.483333,66.4369791 L199.983333,63.8536459 L197.483333,62.2953125 C190.733333,58.1786459 181.483333,57.6286459 173.733333,59.7119791 L173.583333,59.7286459 L173.6,59.6703125 Z M106.866667,51.4036459 L86.6333334,51.4036459 L86.6333334,71.5703125 L106.883333,71.5703125 L106.883333,51.3869791 L106.866667,51.4119791 L106.866667,51.4036459 Z M106.866667,26.0453125 L86.6333334,26.0453125 L86.6333334,46.2119791 L106.883333,46.2119791 L106.883333,26.0703125 L106.866667,26.0453125 L106.866667,26.0453125 Z M106.866667,0.178645898 L86.6333334,0.178645898 L86.6333334,20.3453125 L106.883333,20.3453125 L106.883333,0.178645898 L106.866667,0.178645898 Z M131.616667,51.4036459 L111.5,51.4036459 L111.5,71.5703125 L131.666667,71.5703125 L131.666667,51.3869791 L131.608333,51.4119791 L131.616667,51.4036459 Z M56.6333334,51.4036459 L36.525,51.4036459 L36.525,71.5703125 L56.7083334,71.5703125 L56.7083334,51.3869791 L56.625,51.4119791 L56.6333334,51.4036459 Z M81.8833334,51.4036459 L61.8833334,51.4036459 L61.8833334,71.5703125 L82,71.5703125 L82,51.3869791 L81.875,51.4119791 L81.8833334,51.4036459 Z M31.6333334,51.4036459 L11.6666666,51.4036459 L11.6666666,71.5703125 L31.9,71.5703125 L31.9,51.3869791 L31.65,51.4119791 L31.6333334,51.4036459 Z M81.8833334,26.0453125 L61.8833334,26.0453125 L61.8833334,46.2119791 L82,46.2119791 L82,26.0703125 L81.875,26.0453125 L81.8833334,26.0453125 Z M56.5083334,26.0453125 L36.5583334,26.0453125 L36.5583334,46.2119791 L56.6666666,46.2119791 L56.6666666,26.0703125 L56.5333334,26.0453125 L56.5083334,26.0453125 Z",
      backPath:
        "M22,18 L22,0 C9.8497355,0 0,9.8497355 0,22 L18,22 C20.209139,22 22,20.209139 22,18 Z",
      pathColor: "#FFFFFF",
      backColor: "#42CABA",
    };

    const {
      img,
      showLeft,
      showRight,
      showAnchor,
      label,
      showDocker = false,
      outerStyle = {
        fill: "#E8FFFC",
        stroke: "#FFFFFF",
        radius: 4,
      },
      imgStyle = { fill: "#FFFFFF", lineWidth: 10 },
      imgFillStyle = {
        fillStart: "#B7B7B7",
        startPoint: 0,
        endPoint: 1,
        fillEnd: "#D2D2D2",
      },
      tipIcon,
      dot,
      crown,
    } = cfg;

    let outerWidth;
    let outerHeight;
    let innerWidth;
    let innerHeight;
    let offset;
    const fontSize = 12;
    if (img) {
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

    const keyShape = group.addShape("rect", {
      attrs: {
        x: 0,
        y: 0,
        width: outerWidth,
        height: outerHeight,
        radius: 4,
        stroke: cfg.color,
      },
      draggable: true,
    });
    // if (crown) {
    //   const newCrown = Object.assign(
    //     {
    //       show: true,
    //       size: crown.text.length > 1 ? "big" : "small",
    //       text: "4",
    //       bgFill: "#bbbbbb",
    //     },
    //     crown
    //   );
    //   group.addShape("rect", {
    //     class: "node-crown",
    //     attrs: {
    //       radius: 4,
    //       x: 5,
    //       y: -10,
    //       width: 80,
    //       height: 40,
    //       text: "",
    //       fill: newCrown.bgFill,
    //     },
    //   });
    //   group.addShape("text", {
    //     class: "node-crown",
    //     attrs: {
    //       fill: "#FFFFFF",
    //       x: 44,
    //       y: -5,
    //       textBaseline: "top",
    //       textAlign: "center",
    //       text: newCrown.text,
    //     },
    //   });
    // }
    // group.addShape("rect", {
    //   attrs: {
    //     x: 5,
    //     y: offset,
    //     width: innerWidth,
    //     height: innerHeight,
    //     ...outerStyle,
    //   },
    // });
    // if (dot) {
    //   group.addShape("circle", {
    //     attrs: {
    //       x: innerWidth - 5,
    //       y: offset + 10,
    //       r: dot.r || 5,
    //       fill: dot.fill || "grey",
    //     },
    //   });
    // }
    img &&
      group.addShape("rect", {
        attrs: {
          radius: 4,
          x: 25,
          y: 25,
          width: 40,
          height: 40,
          fill: `l(${Math.PI / 4}) ${imgFillStyle.startPoint}:${
            imgFillStyle.fillStart
          } ${imgFillStyle.endPoint}:${imgFillStyle.fillEnd}`,
        },
      });
    img &&
      group.addShape("path", {
        attrs: {
          // transform: [["t", 25, 25]],
          width: 40,
          height: 40,
          lineWidth: 5,
          path: img,
          ...imgStyle,
        },
      });

    // if (tipIcon) {
    //   const newTipIcon = Object.assign(
    //     {
    //       show: true,
    //       size: tipIcon.text.length > 1 ? "big" : "small",
    //       text: "4",
    //     },
    //     tipIcon
    //   );
    //   const tipIconPath: any = {
    //     small: "M0,0 L19,0 L19,17 L0,17",
    //     big: "M0,0 L33,0 L33,17 L0,17",
    //   };
    //   const tipIconWidth: any = {
    //     small: 19,
    //     big: 33,
    //   };
    //   group.addShape("path", {
    //     attrs: {
    //       transform: [["t", 0, 9]],
    //       path: tipIconPath[newTipIcon.size],
    //       fill: "#6E6E6E",
    //       width: tipIconWidth[newTipIcon.size],
    //       height: 17,
    //     },
    //   });
    //   group.addShape("path", {
    //     attrs: {
    //       transform: [["t", 0, 8]],
    //       path: "M0,17.5 L5,17.5 L5,22 Z",
    //       fill: "#6E6E6E",
    //       width: tipIconWidth[newTipIcon.size],
    //       height: 17,
    //     },
    //   });
    //   group.addShape("text", {
    //     attrs: {
    //       transform: [["t", 0, 9]],
    //       x: tipIconWidth[newTipIcon.size] / 2,
    //       y: (20 - fontSize) / 2,
    //       fill: "#FFFFFF",
    //       fontSize,
    //       text: newTipIcon.text,
    //       textBaseline: "top",
    //       textAlign: "center",
    //     },
    //   });
    // }
    // if (showAnchor) {
    //   group.addShape("circle", {
    //     zIndex: 8,
    //     class: "left-circle",
    //     attrs: {
    //       lineWidth: 2,
    //       fill: showLeft ? outerStyle.stroke || "#1CACF4" : "transparent",
    //       r: 10,
    //       x: 5,
    //       opacity: 0.7,
    //       y: outerHeight / 2,
    //     },
    //   });
    //   group.addShape("circle", {
    //     zIndex: 8,
    //     class: "left-circle",
    //     attrs: {
    //       stroke: outerStyle.stroke || "#1CACF4",
    //       fill: "#FFFFFF",
    //       r: 5,
    //       x: 5,
    //       y: outerHeight / 2,
    //     },
    //   });
    //   group.addShape("circle", {
    //     zIndex: 8,
    //     class: "right-circle",
    //     attrs: {
    //       lineWidth: 2,
    //       fill: showRight ? outerStyle.stroke || "#1CACF4" : "transparent",
    //       r: 10,
    //       x: 85,
    //       opacity: 0.7,
    //       y: outerHeight / 2,
    //     },
    //   });
    //   group.addShape("circle", {
    //     zIndex: 8,
    //     class: "right-circle",
    //     attrs: {
    //       stroke: outerStyle.stroke || "#1CACF4",
    //       fill: "#FFFFFF",
    //       r: 5,
    //       x: 85,
    //       y: outerHeight / 2,
    //     },
    //   });
    // }
    group.addShape("text", {
      attrs: {
        x: outerWidth / 2,
        y: innerHeight + offset - fontSize - 1,
        fill: "#666",
        fontSize,
        text: label,
        textBaseline: "middle",
        textAlign: "center",
      },
    });
    // if (showDocker) {
    //   group.addShape("path", {
    //     attrs: {
    //       transform: [["t", 64, 69]],
    //       width: 22,
    //       height: 22,
    //       path: dockerPath.backPath,
    //       fill: dockerPath.backColor,
    //     },
    //   });
    //   group.addShape("path", {
    //     attrs: {
    //       transform: [
    //         ["t", 670, 750],
    //         ["s", 0.1, 0.1],
    //       ],
    //       path: dockerPath.path,
    //       fill: dockerPath.pathColor,
    //     },
    //   });
    // }
    /*
     * 新增处理APP类型的组的docker迁移的功能
     * 说明：
     *   1、原本此功能需要在app的group这个文件里面书写
     *   2、g6对canvas层级的支持度不行，所以需要在node里面写来保证APP组的蒙层最后绘制
     * */
    // if (
    //   cfg.getParent() &&
    //   cfg.getParent().getModel() &&
    //   cfg.getParent().getModel().dockerTransfer
    // ) {
    //   const defaultStyle = {
    //     stroke: "transparent",
    //     fill: "#000",
    //     opacity: 0.6,
    //     radius: 4,
    //   };
    //   const appParent = cfg.getParent();
    //   const lastChildrenBox = appParent.lastChildrenBox;
    //   const appGroup = appParent.getGraphicGroup();
    //   const { x, y, width, height } = lastChildrenBox;
    //   const attrs = G6.Util.mix({}, defaultStyle);
    //   const pathtt = G6.Util.getRectPath(x, y, width, height, attrs.radius);
    //   appGroup.addShape("path", {
    //     attrs: G6.Util.mix({}, attrs, { path: pathtt }),
    //   });
    // }
    return keyShape;

    // // 如果 cfg 中定义了 style 需要同这里的属性进行融合
    // const shape = group.addShape("path", {
    //   attrs: {
    //     path: this.getPath(cfg), // 根据配置获取路径
    //     stroke: cfg.color, // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
    //   },
    // });
    // if (cfg.label) {
    //   // 如果有文本
    //   // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
    //   // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
    //   // style.text = cfg.label;
    //   group.addShape("text", {
    //     // attrs: style
    //     attrs: {
    //       x: 0, // 居中
    //       y: 0,
    //       textAlign: "center",
    //       textBaseline: "middle",
    //       text: cfg.label,
    //       fill: "#666",
    //     },
    //   });
    // }
    // return shape;
  },
  // 返回菱形的路径
  getPath(cfg: any) {
    const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
    const width = size[0];
    const height = size[1];
    //  / 1 \
    // 4     2
    //  \ 3 /
    const path = [
      ["M", 0, 0 - height / 2], // 上部顶点
      ["L", width / 2, 0], // 右侧顶点
      ["L", 0, height / 2], // 下部顶点
      ["L", -width / 2, 0], // 左侧顶点
      ["Z"], // 封闭
    ];
    return path;
  },
};
export default {
  type: "node",
  name: "service",
  options,
  extendShapeType: "rect",
};
