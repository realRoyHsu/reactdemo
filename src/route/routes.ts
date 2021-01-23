import { lazy } from "react";
import { RouteConfig } from "../components/RenderRoutes";

import Home from "../views/home";

const Draggable = lazy(() => import("../views/draggable"));
const DraggableTask = lazy(() => import("../views/draggable/task"));
const DraggableJsplumb = lazy(() => import("../views/draggable/jsplumb"));
const G6 = lazy(() => import("../views/g6/index"));
const G6Demo = lazy(() => import("../views/g6/demo/index"));
const GraphCustom = lazy(() => import("../views/g6/GraphCustom/index"));
const VirtualListDemo = lazy(() => import("../views/VirtualListDemo/index"));

export const routes: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    component: Home,
    meta: { title: "首页", icon: "", affix: true },
  },
  {
    path: "/draggable",
    component: Draggable,
    meta: { title: "拖拽", icon: "", affix: true },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loadData: () => Promise.resolve({}),
    routes: [
      {
        path: "/draggable/task",
        component: DraggableTask,
        meta: { title: "拖拽任务", icon: "", affix: true },
      },
      {
        path: "/draggable/jsplumb",
        component: DraggableJsplumb,
        meta: { title: "拖拽流程图", icon: "", affix: true },
      },
    ],
  },
  {
    path: "/g6",
    component: G6,
    meta: { title: "G6", icon: "", affix: true },
    routes: [
      {
        path: "/g6/demo",
        component: G6Demo,
        meta: { title: "G6Demo", icon: "", affix: true },
      },
      {
        path: "/g6/graphCustom",
        component: GraphCustom,
        meta: { title: "GraphCustom", icon: "", affix: true },
      },
    ],
  },
  {
    path: "/virtualList",
    component: VirtualListDemo,
  },
];
