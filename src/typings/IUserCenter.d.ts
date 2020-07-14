export interface IMyBusinessData {
  numberId: string; //订单编号
  dealDate: string; // 办事时间
  businessName: string; // 业务名称
  dealGroup: string; // 办事机构
  businessType: string; // 业务类型
  status: number; // 订单状态
  statusText: string; // 0：待处理 1：处理中 2：已办结
  rateStatus: string; // 评价状态
}

export interface IMyBusinessDataDetail extends IMyBusinessData {
  rateContent: string; // 评论内容
  rateCount: number; // 评分
}
