export interface IMatterSearchValue {
  area: string;
  matterType: string;
  number: string;
}

export interface IGetMatterData {
  add_time: string;
  area_id: string;
  cid: string;
  deal_type: string;
  dept_ql_id: string;
  dept_type: string;
  dept_yw_id: string;
  dept_yw_num: string;
  id: string;
  name: string;
  ql_kind_id: string;
  sort: string;
  status: string;
  type: string;
  url: string;
}

// 下拉
export interface IOptionType {
  label: string;
  value: string;
}

export interface ISelectDictType {
  area: IOptionType[];
  matter_type: IOptionType[];
  matter_dept: IOptionType[];
  deal_type: IOptionType[];
}
