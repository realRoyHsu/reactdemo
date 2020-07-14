import { combineReducers } from "redux";

import userInfo from "./userLoginInfo";
import { createAccount, registerStep } from "./register";

export default combineReducers({ userInfo, createAccount, registerStep });
