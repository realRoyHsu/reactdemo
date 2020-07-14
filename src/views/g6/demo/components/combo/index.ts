import G6 from "@antv/g6";

/**
 * create by zhaiyu
 * 2019/7/8
 */
const options = {
  /**
   * 绘制 Combo 中的图形。不需要为默认的 label 增加图形，父类方法会自动增加 label
   * @param  {Object} cfg Combo 的配置项
   * @param  {G.Group} group Combo 的容器
   * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 combo.get('keyShape') 可以获取。
   * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
   */
  drawShape(cfg: any, group: any) {},
  /**
   * 绘制后的附加操作，默认没有任何操作
   * @param  {Object} cfg Combo 的配置项
   * @param  {G.Group} group Combo 的容器
   */
  afterDraw(cfg: any, group: any) {},
  /**
   * 更新节点后的操作，新增的图形需要在这里控制其更新逻辑
   * @override
   * @param  {Object} cfg 节点的配置项
   * @param  {Combo} combo 节点
   */
  afterUpdate(cfg: any, combo: any) {},
  /**
   * 响应 Combo 的状态变化。
   * 在需要使用动画来响应状态变化时需要被复写，其他样式的响应参见下文提及的 [配置状态样式] 文档
   * @param  {String} name 状态名称
   * @param  {Object} value 状态值
   * @param  {Combo} combo 节点
   */
  setState(name: any, value: any, combo: any) {},
};
export default {
  type: "combo",
  name: "combo",
  options,
  extendShapeType: undefined,
};
