import React, { useEffect } from "react";
import * as d3 from "d3";
import { DSVParsedArray } from "d3";

type IData = {
  date: Date;
  close: number;
};
interface Props {}

const Btc: React.FC<Props> = () => {
  let svg = null;
  // 绘制line 坐标轴
  const renderLine = (datas: DSVParsedArray<IData>[], legends: String[]) => {
    const getX = (d: IData) => d.date;
    const getY = (d: IData) => d.close;
    const lineMin = (data: DSVParsedArray<IData>) => d3.min(data, getY);
    const lineMax = (data: DSVParsedArray<IData>) => d3.max(data, getY);
    const minY = d3.min(datas, lineMin);
    const maxY = d3.max(datas, lineMax);
    console.log(datas, minY, maxY);
  };
  //发起请求svg数据
  const fetchQueue: (file: any) => Promise<DSVParsedArray<IData>> = async (
    file: any
  ) => {
    const data: DSVParsedArray<IData> = await d3.csv(
      `./model/${file}`,
      (row: any) => {
        return {
          date: new Date(row.Date),
          close: parseFloat(row.Close),
        };
      }
    );
    return data;
  };
  // 获取svg 数据
  const getData = () => {
    const files = ["AAPL.csv", "INTC.csv", "FB.csv", "AMZN.csv", "GOOG.csv"];
    const legends: String[] = files.map((file) => {
      const reg = /[a-zA-Z0-9]+(?=\.csv)/;
      const fileName = reg.exec(file);
      return (fileName && fileName[0]) || "";
    });
    const fetchQueueData = files.map(fetchQueue);
    Promise.all(fetchQueueData).then((datas: DSVParsedArray<IData>[]) => {
      renderLine(datas, legends);
    });
  };
  const init = () => {
    const maxHeight = 400;
    const maxWidth = 600;
    const barWidth = 20;
    svg = d3
      .select("#btc")
      .append("svg")
      .attr("width", maxWidth + "px")
      .attr("height", maxHeight + "px");
    const colorArray = ["#38CCCB", "#0074D9", "#2FCC40", "#FEDC00", "#FF4036"];
    getData();
  };
  useEffect(() => {
    init();
    // return () => {
    //   cleanup
    // }
  }, []);
  return <div id="btc"></div>;
};
export default Btc;
