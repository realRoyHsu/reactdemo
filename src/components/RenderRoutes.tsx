import React from "react";
import {
  Switch,
  Route,
  RouteComponentProps,
  SwitchProps,
} from "react-router-dom";

export interface RouteConfigComponentProps<
  Params extends { [K in keyof Params]?: string } = {}
> extends RouteComponentProps<Params> {
  route?: RouteConfig;
}

export interface RouteConfig {
  key?: React.Key;
  location?: Location;
  component?: any;
  path?: string | string[];
  exact?: boolean;
  strict?: boolean;
  routes?: RouteConfig[];
  render?: (props: RouteConfigComponentProps<any>) => React.ReactNode;
  [propName: string]: any;
}

export interface IProps {
  routes: RouteConfig[] | undefined;
  extraProps?: any;
  switchProps?: SwitchProps;
}
const RenderRoutes: React.FC<IProps> = (props) => {
  const { routes, extraProps = {}, switchProps = {} } = props;
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          render={(props) =>
            route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            )
          }
        />
      ))}
      {props.children}
    </Switch>
  ) : null;
};

export default RenderRoutes;
