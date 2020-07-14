export interface IQuestionListData {
  id: string;
  label: string;
  value: string;
}

export interface IQuestionList {
  current_page: number;
  data: IQuestionListData[];
  total: number;
}

export interface IMyQuestionData {
  add_time: string;
  address: string;
  appid: string;
  content: string;
  id: string;
  label: string;
  local_idcard: string;
  local_name: string;
  local_phone: string;
  phone: string;
  title: string;
  uid: string;
  username: string;
  uuid: string;
}

export interface IMyQuestionList {
  current_page: number;
  data: IMyQuestionData[];
  total: number;
}
