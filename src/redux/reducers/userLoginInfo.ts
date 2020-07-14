import { SET_USERINFO } from "../constants/index";
import {
  ISetUserLoginType,
  ISetUserLoginAction,
} from "../../typings/ILoginRegis";

const userInfo = (
  state: ISetUserLoginType = {
    username: "",
    password: "",
    isLogin: "",
    userToken: "",
    remember: false,
  },
  action: ISetUserLoginAction
): any => {
  switch (action.type) {
    case SET_USERINFO:
      return action.data;
    default:
      return state;
  }
};

export default userInfo;
