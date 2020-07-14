import { REGISTER_STEP, CREATE_ACCOUNT } from "../constants/index";
import { ICreateAccountParams } from "../../typings/ILoginRegis";

const registerStep = (
  state = { stepNumber: 0, finish: false },
  action: { type: string; data: any }
): any => {
  switch (action.type) {
    case REGISTER_STEP:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

const initState: ICreateAccountParams = {
  username: "",
  password: "",
  repassword: "",
  city: "",
  phone: "",
  captchaImage: {
    id: 0,
    code: "",
  },
  captchaSms: {
    id: 0,
    code: "",
  },
};

const createAccount = (
  state = initState,
  action: { type: string; data: any }
): any => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export { createAccount, registerStep };
