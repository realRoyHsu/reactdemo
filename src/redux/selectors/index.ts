import { createSelector } from "reselect";
import { ISetUserLoginType } from "../../typings/ILoginRegis";

export const userLoginInfoSelector = createSelector(
  (state: any) => state.userInfo,
  (userInfo: ISetUserLoginType) => userInfo
);
