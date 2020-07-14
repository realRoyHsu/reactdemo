// login redux
export type ISetUserLoginType = {
  username: string;
  password: string;
  isLogin: string;
  userToken: string;
  remember: boolean;
};

export type ISetUserLoginAction = {
  type: string;
  data: SetUserLoginType;
};

export interface IDispatchProps {
  setUserLoginInfo: (values: ISetUserLoginType) => void;
}

// 注册
export type ICreateAccountParams = {
  username: string;
  password: string;
  repassword: string;
  city: string;
  phone: string;
  captchaImage: {
    id: number;
    code: string;
  };
  captchaSms: {
    id: number;
    code: string;
  };
};

export type ISetCreateAccountParamsAction = {
  type: string;
  data: CreateAccountParams;
};

export interface IRegisterStep {
  stepNumber: number;
  finish: boolean;
}

export type ISetRegisterStepAction = {
  type: string;
  data: RegisterStep;
};

export interface IInfoType {
  uid: string;
  username: string;
  realname: string;
  nickname: string;
  gender: string;
  email: string;
  idcard: string;
  phone: string;
  userType?: string;
  // eslint-disable-next-line @typescript-eslint/camelcase
  user_type?: string;
  address: string;
  avatar: string;
}
