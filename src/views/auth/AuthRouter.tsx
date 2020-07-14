import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { userLoginInfoSelector } from "./../../redux/selectors/index";

export interface IProps {
  path: string;
  Component: React.FC;
}

const AuthRouter: React.FC<IProps> = ({ path, Component }) => {
  const memoUserInfoLoginSelector = useMemo(() => userLoginInfoSelector, []);
  const { isLogin } = useSelector(memoUserInfoLoginSelector);
  // const isLogged = isLogin === "1" ? true : false;
  const isLogged = true;
  return (
    <Route
      path={path}
      render={(): JSX.Element =>
        isLogged ? <Component /> : <Redirect to={"/login"} />
      }
    />
  );
};

export default AuthRouter;
