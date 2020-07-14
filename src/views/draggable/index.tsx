import React from "react";
import RenderRoutes, { RouteConfig } from "../../components/RenderRoutes";

interface Props {
  route: RouteConfig;
}

interface Props {}
const Draggable: React.FC<Props> = (props) => {
  return (
    <div className="Draggable">
      <h1>Draggable</h1>
      <RenderRoutes routes={props.route && props.route.routes}></RenderRoutes>
    </div>
  );
};
export default Draggable;
