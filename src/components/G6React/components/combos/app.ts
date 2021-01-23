import G6 from "@antv/g6";
import { Item, ModelConfig } from "@antv/g6/lib/types";
import GGroup from "@antv/g-canvas/lib/group";
import { styleConfig, imgStyleConfig } from "./../configs/index";

const defaultWidth = 284;
const defaultHeight = 150;

const options = {
  /**
   * 绘制 Combo 中的图形。不需要为默认的 label 增加图形，父类方法会自动增加 label
   * @param  {Object} cfg 配置项
   * @param  {G.combo} group 容器
   * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 combo.get('keyShape') 可以获取。
   * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
   */
  draw: function (cfg: ModelConfig, group: GGroup): any {
    // Get the shape style, where the style.r corresponds to the R in the Illustration of Built-in Rect Combo
    const config = styleConfig;

    const getBBox = group.getBBox();

    console.log(cfg, getBBox);
    // 容器自适应
    const width = cfg?.style?.width || 0;
    const height = cfg?.style?.height || 0;
    const padding = 8;
    // Add a circle shape as keyShape which is the same as the extended 'circle' type Combo
    const keyShape = group.addShape("rect", {
      attrs: {
        // x: -(cfg?.style?.width || 0),
        // y: -(cfg?.style?.height || 0),
        x: -defaultWidth + width / 2 + padding,
        y: -defaultHeight + height / 2 + padding,
        width: defaultWidth,
        height: defaultHeight,
        fill: config.backgoundColor,
        stroke: config.borderColor,
        lineWidth: config.lineWidth,
        radius: styleConfig.radius,
      },
      draggable: true,
      name: "combo-keyShape",
    });
    console.log(Math.max(cfg?.style?.width || 0, defaultWidth));

    // header
    group.addShape("rect", {
      attrs: {
        x: -defaultWidth + width / 2 + padding,
        y: -defaultHeight + height / 2 + padding,
        width: defaultWidth,
        height: 30,
        fill: "#FFF",
        stroke: config.borderColor,
        lineWidth: config.lineWidth,
        radius: styleConfig.radius,
      },
      draggable: true,
      name: "combo-header-keyShape",
    });
    return keyShape;
  },
  /**
   * 绘制后的附加操作，默认没有任何操作
   * @param  {Object} cfg 配置项
   * @param  {G.Group} group 容器
   */
  afterDraw: (cfg: any, group: any): any => {
    const rect = group.find((ele: any) => ele.get("name") === "combo-keyShape");
    const rectHeader = group.find(
      (ele: any) => ele.get("name") === "combo-header-keyShape"
    );
    const rectHeaderBox = rectHeader.getBBox();
    const getBBox = rect.getBBox();
    console.log(cfg, group, getBBox, rectHeaderBox);
  },

  /**
   *
   * @param cfg 配置项
   * @param item 实例
   */
  update(cfg: any, item: any): any {
    const model = item.getModel();
    const getItemBBox = item.getBBox();
    const group = item.getContainer();
    const rect = group.find((ele: any) => ele.get("name") === "combo-keyShape");
    const rectHeader = group.find(
      (ele: any) => ele.get("name") === "combo-header-keyShape"
    );
    const groupBox = group.getBBox();
    const getBBox = rect.getBBox();
    const rectHeaderBox = rectHeader.getBBox();
    console.log(cfg, groupBox, getItemBBox, getBBox, rectHeaderBox, model.data);
    // rect.attr({
    //   x: getBBox.x,
    //   y: getBBox.y,
    //   width: Math.ceil(getBBox.maxX) - Math.floor(getBBox.minX),
    //   height: Math.ceil(getBBox.maxY) - Math.floor(getBBox.minY),
    // });
    // rectHeader.attr({
    //   x: rectHeaderBox.x,
    //   y: rectHeaderBox.y,
    //   width: rectHeaderBox.width,
    //   height: 30,
    // });
  },
  /**
   * 更新节点后的操作，新增的图形需要在这里控制其更新逻辑
   * @override
   * @param  {Object} cfg 配置项
   * @param  {Combo} item 实例
   */
  afterUpdate: (cfg: any, item: any): any => {
    // const rect = item.find((ele: any) => ele.get("name") === "combo-keyShape");
    // const getBBox = rect.getBBox();
    // console.log(cfg, item, getBBox);
  },
  /**
   * 是否允许更新。
   * @param type 元素类型，'node' 或 'edge'
   */
  shouldUpdate(type: string): boolean {
    console.log(type);
    return true;
  },
  /**
   * 响应 Combo 的状态变化。
   * 在需要使用动画来响应状态变化时需要被复写，其他样式的响应参见下文提及的 [配置状态样式] 文档
   * @param  {String} name 状态名称
   * @param  {Object} value 状态是否可用，为 true 时可用，否则不可用
   * @param  {item} item 实例
   */
  setState: (name: string, value: boolean, item: Item): any => {
    console.log(name, value, item);
  },
};
export default {
  type: "combo",
  name: "app",
  options,
  extendShapeType: "rect",
};
