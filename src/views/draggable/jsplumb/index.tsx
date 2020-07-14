import React, { useState } from "react";
import LeftSide from "./leftSide";
import Flow, { NodeType, ConnectionType } from "./flow";
import RightSide from "./rightSide";
import "./index.scss";

interface Props {}
const Jsplumb: React.FC<Props> = () => {
  const [nodeData, setNodeData] = useState<NodeType[]>([
    {
      key: 0,
      id: "target-0",
      name: "0-2",
      status: false,
      type: "TreeNode",
      x: 0,
      y: 0,
    },
    {
      key: 1,
      id: "target-1",
      name: "0-1-0-0",
      status: false,
      type: "TreeNode",
      x: 50,
      y: 95,
    },
  ]);
  const [connectionsData, setConnectionsData] = useState<ConnectionType[]>([
    {
      id: "con_1",
      sourceId: "target-0",
      targetId: "target-1",
    },
  ]);

  return (
    <div className="Jsplumb">
      <LeftSide />
      <Flow
        nodeData={nodeData}
        setNodeData={setNodeData}
        connectionsData={connectionsData}
        setConnectionsData={setConnectionsData}
      />
      <RightSide />
    </div>
  );
};
export default Jsplumb;
