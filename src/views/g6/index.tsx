import React from "react";
import RenderRoutes, { RouteConfig } from "../../components/RenderRoutes";

interface Props {
  route: RouteConfig;
}
const Graph: React.FC<Props> = (props) => {
  return (
    <div className="g6">
      <h1>Draggable</h1>
      <RenderRoutes routes={props.route && props.route.routes}></RenderRoutes>
    </div>
  );
};
export default Graph;
