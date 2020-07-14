import { REGISTER_STEP, CREATE_ACCOUNT } from "../constants/index";
import {
  IRegisterStep,
  ICreateAccountParams,
  ISetRegisterStepAction,
  ISetCreateAccountParamsAction,
} from "../../typings/ILoginRegis";

const registerStep = (data: IRegisterStep): ISetRegisterStepAction => {
  return {
    type: REGISTER_STEP,
    data,
  };
};

const createAccount = (
  data: ICreateAccountParams
): ISetCreateAccountParamsAction => {
  return {
    type: CREATE_ACCOUNT,
    data,
  };
};

export { registerStep, createAccount };
