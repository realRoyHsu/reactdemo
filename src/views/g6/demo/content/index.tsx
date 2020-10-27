import React, { useEffect, useRef, useState } from "react";
import { GraphReact } from "@/components/G6React/index";
import { GraphData, NodeConfig } from "@antv/g6/lib/types";
// 事件
import { nodeAddListener } from "../events";

const data: GraphData = {
  nodes: [
    {
      id: "1",
      type: "app",
      ip: "127.0.0.1",
      status: "default",
      showLeftEndPoint: true,
      showRightEndPoint: true,
      showDocker: true,
      x: 100,
      y: 50,
      label: "node1",
      img:
        "M10.7783703,12.8919901 C4.26131474,12.9681774 3.19320493,16.4358805 7.20844966,23.2065512 C11.0245827,19.0126116 15.5269389,16.1450952 20.7155181,14.6040019 C21.1269655,19.0891862 23.6557359,22.8453999 28.3018294,25.8726429 L29.6485511,24.8163711 L34.2699199,30.8496712 C35.9749397,30.4219726 37.2182997,31.1387489 38,33 L34.2699199,33 C24.2084029,27.8586327 17.3851304,25.4123917 13.8001023,25.6612771 C10.3582083,25.4950705 7.68770202,26.4861555 5.7885834,28.634532 C4.96253016,29.7812552 4.65328319,31.017915 4.86084249,32.3445113 L1,32.3445113 C2.65381696,29.1207613 4.51893986,26.3054515 6.59536871,23.8985819 C2.25955328,16.7051265 3.3310049,12.4063704 10.0000173,12.0273695 C10.0000058,12.0250795 10,12.0227844 10,12.0204841 C10,11.3617356 10.2294804,11 11.7098019,11 C12.6966829,11 14.4600822,11.5508774 17,12.6526323 C13.9162187,12.9271882 12.057346,13.0389894 11.4233817,12.9880361 C11.1760416,12.9681567 10.9610734,12.9377276 10.7783703,12.8919901 Z M24.4207149,9.69273028 C26.5626759,8.69125358 28.8780392,8.69125358 31.366805,9.69273028 C31.7011268,7.91145881 32.8145962,6.68054872 34.707213,6 C35.8359852,15.5091431 33.7009684,21.8424764 28.3021625,25 C22.4892486,21.7379449 20.1468787,15.4046115 21.2750527,6 C22.5830411,6.27368804 23.3858864,6.8061778 23.6835887,7.5974693 C23.9812911,8.38876079 24.2269998,9.08718112 24.4207149,9.69273028 Z M32.8410632,9.96942969 L32.5036652,11.767091 L30.8068423,11.0842912 C28.6909486,10.2328578 26.8070381,10.2328578 25.05603,11.051544 L23.5115271,11.7736784 L22.9920371,10.1497641 C22.864831,9.75212065 22.7131178,9.30955289 22.5369781,8.82255106 C22.1930629,15.7801244 24.1259293,20.5198264 28.2823232,23.2351726 C32.1253158,20.5700727 33.8720076,15.7501476 33.4368307,8.59237113 C33.1355879,8.97796515 32.9416224,9.43364888 32.8410632,9.96942969 Z M28.3826354,27.7156049 L27.4829626,27.1294075 C23.1049779,24.2768554 20.4182816,20.7465118 19.5057821,16.5832491 C14.7320875,18.3278831 10.6015306,21.3338241 7.10575653,25.6236977 C8.96632362,24.5345877 11.206952,24.0473855 13.7868662,24.1591031 C17.3361705,23.9529906 23.273998,25.9338743 31.7967053,30.0875881 L29.3803916,26.9330367 L28.3826354,27.7156049 Z M14.305975,31 L9,27.58396 C10.1249406,27.0533801 11.6961364,26.8843596 13.7135872,27.0768988 C13.4750812,27.7950875 13.8789847,28.6633876 14.9252977,29.6817992 C15.0640611,29.5229389 15.5624962,29.4532219 16.4206032,29.4726482 C17.5695915,29.579652 18.0916755,30.0887693 17.9868553,31 L14.305975,31 Z",
      comboId: "combo1",
    },
    {
      id: "2",
      type: "app",
      ip: "127.0.0.1",
      status: "success",
      x: 100,
      y: 150,
      label: "Subpage",
      // comboId: "combo1",
    },
  ],
  edges: [],
  combos: [
    {
      id: "combo1",
      type: "group",
      label: "Combo1",
    },
  ],
};

interface Props {}
const App: React.FC<Props> = () => {
  const containerRef = useRef<any>(null);
  const graphRef = useRef<any>(null);

  useEffect(() => {
    const width =
      (containerRef.current && containerRef.current.scrollWidth) || 500;
    const height =
      (containerRef.current && containerRef.current.scrollHeight) || 500;
    // const width: number =
    //   document.getElementById("container")?.scrollWidth || 500;
    // const height = document.getElementById("container")?.scrollHeight || 500;
    if (!graphRef.current) {
      graphRef.current = new GraphReact({
        container: containerRef.current,
        // plugins: [minimap, grid], // 将 minimap 实例配置到图上
        width,
        height,
        animate: true,
        // translate the graph to align the canvas's center, support by v3.5.1
        fitCenter: true,
        renderer: "svg",
        // fitView: true,
        // fitViewPadding: [20, 40, 50, 20],
        modes: {
          default: [
            "drag-canvas",
            "drag-combo",
            // "drag-node",
            "move-node",
            // {
            //   type: "drag-node",
            //   // enableDelegate: true,
            //   // shouldBegin: (e) => {
            //   //   // 不允许拖拽 id 为 'node1' 的节点
            //   //   if (e.item && e.item.getModel().id === "node1") return false;
            //   //   return true;
            //   // },
            // },
            // "drag-node-with-group",
            "zoom-canvas",
          ],
        },
        minZoom: 0.2,
        maxZoom: 10,
      });
      graphRef.current.data(data); // 加载远程数据
      graphRef.current.render(); // 渲染
      // graphRef.current.paint(); // 重绘
      // nodeAddListener(graphRef.current);
    }
  }, []);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>): any => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e, "onDragEnter");
  };

  const onDragOver = (e: any): any => {
    e.preventDefault();
    e.stopPropagation();
    console.log("onDragOver");
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>): any => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e, "onDragLeave");
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>): any => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    const data = e.dataTransfer.getData("service");
    console.log(data, "onDrop");
  };

  return (
    <div
      ref={containerRef}
      id="container"
      className="Content"
      onDragOver={onDragOver}
      // onDragEnter={onDragEnter}
      onDrop={onDrop}
      // onDragLeave={onDragLeave}
    ></div>
  );
};
export default App;
