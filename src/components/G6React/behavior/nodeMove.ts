const nodeMove = {
  // 定义事件及处理事件的方法
  getEvents(): any {
    console.log("getEvents");
    return {
      "node:mouseenter": "onNodeMouseEnter",
      "node:mouseleave": "onNodeMouseLeave",
      "node:dragstart": "onNodeDragStart",
      "node:drag": "onNodeDrag",
      "node:dragend": "onNodeDragend",
      "canvas:mouseleave": "onCanvasMouseLeave",
      "node:click": "onNodeClick",
      mousemove: "onMouseMove",
    };
  },
  onNodeMouseEnter(e: any): any {
    console.log(e, e.item.get("canvas"), "onNodeMouseEnter");
    e.preventDefault();
  },
  onNodeMouseLeave(e: any): any {
    console.log("onNodeMouseLeave");
    e.preventDefault();
  },
  onNodeDragStart(e: any): any {
    console.log(e, "onNodeDragStart");
    e.preventDefault();
  },
  onNodeDrag(e: any): any {
    console.log("onNodeDrag");
    e.preventDefault();
  },
  onNodeDragend(e: any): any {
    console.log("onNodeDrag");
    e.preventDefault();
  },
  onCanvasMouseLeave(e: any): any {
    console.log("onNodeDrag");
    e.preventDefault();
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
  },
  // 自定义方法
  onMouseMove(e: any): any {
    // TODO
    e.preventDefault();
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

export default {
  name: "nodeMove",
  options: nodeMove,
};
