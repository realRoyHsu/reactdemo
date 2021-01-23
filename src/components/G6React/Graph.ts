import G6 from "@antv/g6";
import { GraphOptions, BehaviorOption } from "@antv/g6/lib/types";
import Utils from "./utils/index";
import defaultComponent from "./components/index";
import "./behavior/index";
import PluginBase from "@antv/g6/lib/plugins/base";

const _initComponent = Symbol("_initComponent");

function addUtilMethods(list: any) {
  return function (target: any): void {
    Object.assign(target.prototype, list);
  };
}

@addUtilMethods(Utils)
class Graph extends G6.Graph {
  constructor(options: GraphOptions) {
    super(options);
    this[_initComponent]();
  }

  // 初始化组件
  [_initComponent] = (): void => {
    defaultComponent.forEach((item: any) => {
      this.registerComponent(item.type, item, item.extendShapeType);
    });
  };

  /**
   * 全局注册组建
   * @param type{String} 必须为字符串，为G6原生支持的几种类型
   * @param item {Object} 组件对象，参照内置提供的写
   * @param extendShapeType {String} 继承的类型名称
   */
  registerComponent = (
    type: "node" | "edge" | "combo",
    item: any,
    extendShapeType?: string | undefined
  ): void => {
    switch (type) {
      case "node":
        G6.registerNode(item.name, item.options, extendShapeType);
        break;
      case "edge":
        G6.registerEdge(item.name, item.options, extendShapeType);
        break;
      case "combo":
        G6.registerCombo(item.name, item.options, extendShapeType);
        break;
      default:
        throw new Error(`type[${type}] is illegal!`);
    }
  };

  /**
   * 全局注册行为
   * @param name behaviors 名称
   * @param behavior BehaviorOption
   */
  registerBehavior = (name: string, behavior: BehaviorOption): any => {
    G6.registerBehavior(name, behavior);
  };

  /*
   * 注册插件系统
   * @overrides
   * */
  addPlugin(plugin: PluginBase) {
    super.addPlugin(plugin);
  }
}

export default Graph;
