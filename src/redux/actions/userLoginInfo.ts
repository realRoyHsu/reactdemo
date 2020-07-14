import { SET_USERINFO } from "../constants/index";
import {
  ISetUserLoginType,
  ISetUserLoginAction,
} from "../../typings/ILoginRegis";

const setUserLoginInfo = (data: ISetUserLoginType): ISetUserLoginAction => {
  return {
    type: SET_USERINFO,
    data,
  };
};
export { setUserLoginInfo };
