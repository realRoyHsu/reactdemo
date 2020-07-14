import React from "react";
import LeftSide from "./leftSide";
import Content from "./content/index";
import "./index.scss";

interface Props {}
const Demo: React.FC<Props> = () => {
  return (
    <div className="G6Demo">
      <LeftSide />
      <Content />
    </div>
  );
};
export default Demo;
