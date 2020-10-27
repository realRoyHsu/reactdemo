import { IJson } from "@/typings/ICommon";
import G6 from "@antv/g6";
import ModeNode from "./move-node";

const behaviors: IJson = {
  "move-node": ModeNode,
};

Object.keys(behaviors).forEach((item: string, index) => {
  G6.registerBehavior(item, behaviors[item]);
});
