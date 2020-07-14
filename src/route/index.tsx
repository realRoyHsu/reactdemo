import React, { Suspense, useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import RenderRoutes from "./../components/RenderRoutes";
import { routes } from "./routes";
import AuthRouter from "../views/auth/AuthRouter";
import Login from "../views/login";
import NotFound from "../common/NotFound";

interface IProps {}
const Routers: React.FC<IProps> = () => {
  return (
    <Router>
      <Suspense fallback={"sss"}>
        <Switch>
          <Route component={Login} exact path="/login" />
          <AuthRouter
            path="/"
            Component={(): JSX.Element => (
              <RenderRoutes routes={routes}>
                {/* <Route render={() => <Redirect to="/404" />} /> */}
                <Redirect exact from="/" to="/draggable/jsplumb" />
              </RenderRoutes>
            )}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};
export default Routers;
