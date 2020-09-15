import G6 from "@antv/g6";

/**
 * create by zhaiyu
 * 2019/7/8
 */
const options = {
  /**
   * 绘制 Combo 中的图形。不需要为默认的 label 增加图形，父类方法会自动增加 label
   * @param  {Object} cfg Combo 的配置项
   * @param  {G.combo} combo Combo 的容器
   * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 combo.get('keyShape') 可以获取。
   * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
   */
  drawShape: function (cfg: any, group: any): any {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self: any = this;
    // Get the shape style, where the style.r corresponds to the R in the Illustration of Built-in Rect Combo
    const style = self?.getShapeStyle(cfg);
    cfg.padding = cfg.padding || [20, 20, 20, 20];
    // Add a circle shape as keyShape which is the same as the extended 'circle' type Combo
    const rect = group.addShape("rect", {
      attrs: {
        ...style,
        x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
        y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
        width: style.width,
        height: style.height,
      },
      draggable: true,
      name: "combo-keyShape",
    });
    // Add the marker on the bottom
    const marker = group.addShape("marker", {
      attrs: {
        ...style,
        fill: "#fff",
        opacity: 1,
        x: 0,
        y: style.r,
        r: 10,
        // symbol: collapseIcon,
      },
      draggable: true,
      name: "combo-marker-shape",
    });

    return rect;
  },
  /**
   * 绘制后的附加操作，默认没有任何操作
   * @param  {Object} cfg Combo 的配置项
   * @param  {G.Group} group Combo 的容器
   */
  afterDraw: (cfg: any, group: any): any => {
    // console.log(cfg, group);
  },
  /**
   * 更新节点后的操作，新增的图形需要在这里控制其更新逻辑
   * @override
   * @param  {Object} cfg 节点的配置项
   * @param  {Combo} combo 节点
   */
  afterUpdate: (cfg: any, combo: any): any => {
    console.log(cfg, combo);
  },
  /**
   * 响应 Combo 的状态变化。
   * 在需要使用动画来响应状态变化时需要被复写，其他样式的响应参见下文提及的 [配置状态样式] 文档
   * @param  {String} name 状态名称
   * @param  {Object} value 状态值
   * @param  {Combo} combo 节点
   */
  // setState: (name: any, value: any, combo: any): any => {
  //   console.log(name, value, combo);
  // },
};
export default {
  type: "combo",
  name: "region",
  options,
  extendShapeType: "rect",
};
