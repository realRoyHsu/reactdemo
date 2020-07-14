import React, { useRef, useEffect, useState } from "react";
import G6 from "@antv/g6";
import { GraphOptions } from "@antv/g6/lib/types";

/*
 * 定义私有变量
 * */
const _initBehaviour = Symbol("_initBehaviour");
const _initPlugin = Symbol("_initPlugin");
const _initCommand = Symbol("_initCommand");

class Graph extends G6.Graph {
  constructor(options: GraphOptions) {
    console.log(options);
    super(options);
  }
  // [_initPlugin](): void {}
  // [_initCommand](): void {}
}

export default { Graph };
