import React from "react";
import "./index.scss";

interface Props {}
const App: React.FC<Props> = () => {
  const onDragStart = (e: any): void => {
    // e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.setData("Text", e.target.id);
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

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>): any => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e, "onDragEnter");
  };

  const onDragOver = (e: any): any => {
    e.preventDefault();
    e.stopPropagation();
    e.persist();
    const data = e.dataTransfer.getData("service");
    console.log(e, data, "onDragOver");
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>): any => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e, "onDragLeave");
  };

  const onDrop = (e: any): any => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    const pattern1 = /^box/;
    const data = e.dataTransfer.getData("Text");
    console.log(data);
    if (pattern1.test(e.target.id)) {
      e.target.appendChild(document.getElementById(data));
      e.preventDefault();
    }
    console.log(e, "onDrop");
  };
  return (
    <div>
      <div id="box1" onDragOver={onDragOver} onDrop={onDrop}>
        <div id="item1" draggable="true" onDragStart={onDragStart}>
          item1
        </div>
        <div id="item2" draggable="true" onDragStart={onDragStart}>
          item2
        </div>
        <div id="item3" draggable="true" onDragStart={onDragStart}>
          item3
        </div>
      </div>
      <div id="box2" onDragOver={onDragOver} onDrop={onDrop}>
        <div id="item4" draggable="true" onDragStart={onDragStart}>
          item4
        </div>
      </div>
      <div id="box3" onDragOver={onDragOver} onDrop={onDrop}></div>
    </div>
  );
};
export default App;
