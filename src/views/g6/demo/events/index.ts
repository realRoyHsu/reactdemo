// 节点事件
const nodeAddListener = (graph: any): void => {
  // 鼠标进入节点
  // graph.on("node:mouseenter", (e: any) => {
  //   debugger;
  //   const nodeItem = e.item; // 获取鼠标进入的节点元素对象
  //   graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
  //   console.log(e, nodeItem, "ee");
  //   const icon = nodeItem.find(
  //     (element: any) => element.get("name") === "collapse-icon"
  //   );
  //   if (icon) {
  //     const bg = nodeItem.find(
  //       (element: any) => element.get("name") === "collapse-icon-bg"
  //     );
  //     icon.on("mouseenter", () => {
  //       bg.attr("opacity", 1);
  //       graph.get("canvas").draw();
  //     });
  //     icon.on("mouseleave", () => {
  //       bg.attr("opacity", 0);
  //       graph.get("canvas").draw();
  //     });
  //   }
  // });
  // // 鼠标离开节点
  // graph.on("node:mouseleave", (e: any) => {
  //   const nodeItem = e.item; // 获取鼠标离开的节点元素对象
  //   graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
  // });
  // // 点击节点
  // graph.on("node:click", (e: any) => {
  //   // 先将所有当前是 click 状态的节点置为非 click 状态
  //   const clickNodes = graph.findAllByState("node", "click");
  //   clickNodes.forEach((cn: any) => {
  //     graph.setItemState(cn, "click", false);
  //   });
  //   const nodeItem = e.item; // 获取被点击的节点元素对象
  //   graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
  // });
  // // 点击边
  // graph.on("edge:click", (e: any) => {
  //   // 先将所有当前是 click 状态的边置为非 click 状态
  //   const clickEdges = graph.findAllByState("edge", "click");
  //   clickEdges.forEach((ce: any) => {
  //     graph.setItemState(ce, "click", false);
  //   });
  //   const edgeItem = e.item; // 获取被点击的边元素对象
  //   graph.setItemState(edgeItem, "click", true); // 设置当前边的 click 状态为 true
  // });
  // graph.on("combo:mouseenter", (e: any) => {
  //   const { item } = e;
  //   graph.setItemState(item, "hover", true);
  // });
  // graph.on("combo:mouseleave", (e: any) => {
  //   const { item } = e;
  //   graph.setItemState(item, "hover", false);
  // });
};

export { nodeAddListener };
