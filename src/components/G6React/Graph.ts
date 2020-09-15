import React, { useRef, useEffect, useState } from "react";
import G6 from "@antv/g6";
import { GraphOptions, BehaviorOption } from "@antv/g6/lib/types";
import defaultComponent from "./components/index";
import defaultBehavior from "./behavior/index";

const _initComponent = Symbol("_initComponent");
const _initBehavior = Symbol("_initBehavior");

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

  // 初始化行为
  static [_initBehavior] = (): void => {
    defaultBehavior.forEach((item) => {
      G6.registerBehavior(item.name, item.options);
      // super.removeBehaviors(item.name, "default");
      // super.addBehaviors(item.name, "default");
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
  registerBehaviors = (name: string, behavior: BehaviorOption): any => {
    G6.registerBehavior(name, behavior);
  };
}

export default Graph;
