import React from "react";
import RenderRoutes, { RouteConfig } from "../../components/RenderRoutes";

interface Props {
  route: RouteConfig;
}
const D3: React.FC<Props> = (props) => {
  return (
    <div className="D3">
      <h1>D3</h1>
      <RenderRoutes routes={props.route && props.route.routes}></RenderRoutes>
    </div>
  );
};
export default D3;
