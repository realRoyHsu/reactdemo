// json
export type IJson = {
  [key: string]: any;
};

// 签名参数
export interface ISign extends IJson {
  signField: string[] | [];
}
