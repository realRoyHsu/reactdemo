//   拖动事件：

// 拖动的元素上触发：事件皆由拖动元素监听

// ondragstart: 用户开始拖拉元素的时候触发
// ondrag:元素拖动过程中触发
// ondragend: 用户完成元素拖动后触发
// 释放所位于的元素（容器）上触发：事件皆由容器元素监听

// ondragenter:当拖动元素进入容器中时触发
// ondragover:当拖动元素在容器中拖动过程中触发
// ondrop:在容器中，释放拖拉时触发
import React, { useEffect } from "react";

interface Props {
  title: string;
  name: string;
  searchValue: string;
  active: boolean;
}
const TreeNodeItem: React.FC<Props> = (props) => {
  const index = props.title.indexOf(props.searchValue);
  const beforeStr = props.title.substr(0, index);
  const afterStr = props.title.substr(index + props.searchValue.length);

  useEffect(() => {
    const left = document.querySelector("LeftSide");
    left &&
      left.addEventListener("dragstart", (e) => {
        console.log(e);
      });
  }, []);

  const onDragStart = (e: any): void => {
    // e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.setData(
      "service",
      JSON.stringify({
        title: props.title,
        name: props.name,
        active: props.active,
      })
    );
    console.log(e, "onDragStart");
  };

  const onDrag = (e: React.DragEvent<HTMLSpanElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    e.persist();
    console.log(e, "onDrag");
  };

  const onDragEnd = (e: React.DragEvent<HTMLSpanElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e, "onDragEnd");
  };

  return index > -1 ? (
    <span
      draggable={props.active}
      className={props.active ? "drag-move" : ""}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    >
      {beforeStr}
      <span className="site-tree-search-value">{props.searchValue}</span>
      {afterStr}
    </span>
  ) : (
    <span
      draggable={props.active}
      className={props.active ? "drag-move" : ""}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    >
      {props.title}
    </span>
  );
};
export default TreeNodeItem;
