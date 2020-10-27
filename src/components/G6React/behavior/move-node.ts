import { INode } from "@antv/g6/lib/interface/item";
import { BehaviorOption, G6Event } from "@antv/g6/lib/types";

const modeNode: BehaviorOption = {
  // 定义事件及处理事件的方法
  getEvents(): { [key in G6Event]?: string } {
    console.log("getEvents");
    return {
      "node:mouseenter": "onMouseEnter",
      "node:mouseleave": "onMouseLeave",
      "node:dragstart": "onDragStart",
      "node:drag": "onDrag",
      "node:dragend": "onDragend",
      "node:click": "onNodeClick",
      mousemove: "onMouseMove",
    };
  },
  onMouseEnter(e: any): any {
    console.log(e, e.item.get("canvas"), "onMouseEnter");
    e.preventDefault();
    e.stopPropagation();
  },
  onMouseLeave(e: any): any {
    console.log("onMouseLeave");
    e.preventDefault();
    e.stopPropagation();
  },
  onDragStart(e: any): any {
    console.log(e, "onDragStart");

    const item: INode = e.item as INode;

    // 拖动时，设置拖动元素的 capture 为false，则不拾取拖动的元素
    const group = item.getContainer();
    group.set("capture", false);

    e.preventDefault();
    e.stopPropagation();
  },
  onDrag(e: any): any {
    console.log("onDrag");
    e.preventDefault();
    e.stopPropagation();
  },
  onDragend(e: any): any {
    console.log("onDrag");
    e.preventDefault();
    e.stopPropagation();
  },
  onCanvasMouseLeave(e: any): any {
    console.log("onDrag");
    e.preventDefault();
    e.stopPropagation();
  },
  // 自定义方法
  onNodeClick(e: any): any {
    // const model = {
    //   id: "node",
    //   label: "node",
    //   address: "cq",
    //   x: 200,
    //   y: 150,
    //   style: {
    //     fill: "blue",
    //   },
    // };
    // // TODO
    // const item = e.currentTarget.findById("circle");
    // e.currentTarget.updateItem(item, model);
    console.log(e, "nodeclick");
    e.preventDefault();
    e.stopPropagation();
  },
  // 自定义方法
  onMouseMove(e: any): any {
    // TODO
    e.preventDefault();
    e.stopPropagation();
  },
  // 会与用户传入的参数进行合并
  getDefaultCfg(): any {
    return {
      trigger: "click", // mouseneter or click
    };
  },
  // 是否阻止行为发生
  shouldBegin(): boolean {
    // 这里可以根据业务自定义
    return true;
  },
  // 是否更新数据及更改视图
  shouldUpdate: (e: any): boolean => {
    if (e.target.type !== "text") {
      return false;
    }
    console.log(e, "should");
    return true;
  },
  // 是否结束行为，默认返回 true。
  shouldEnd(): boolean {
    // 这里可以根据业务自定义
    return true;
  },
};

export default modeNode;
