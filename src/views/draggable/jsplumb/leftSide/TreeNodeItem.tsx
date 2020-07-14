import React from "react";
import { useDrag, XYCoord } from "react-dnd";

interface Props {
  title: string;
  name: string;
  searchValue: string;
}
const TreeNodeItem: React.FC<Props> = (props) => {
  // drag 拖拽
  const [{ isDragging }, drag] = useDrag({
    item: { id: props.name, name: props.name, status: false, type: "TreeNode" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      console.log(delta);
      if (item && dropResult) {
        // alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;
  const index = props.title.indexOf(props.searchValue);
  const beforeStr = props.title.substr(0, index);
  const afterStr = props.title.substr(index + props.searchValue.length);

  return index > -1 ? (
    <span ref={drag} className="drag-move">
      {beforeStr}
      <span className="site-tree-search-value">{props.searchValue}</span>
      {afterStr}
    </span>
  ) : (
    <span ref={drag} className="drag-move">
      {props.title}
    </span>
  );
};
export default TreeNodeItem;
