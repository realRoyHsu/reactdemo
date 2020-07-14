import React, { useState } from "react";
import { Tree, Input } from "antd";
import TreeNodeItem from "./TreeNodeItem";

const { Search } = Input;

const x = 3;
const y = 2;
const z = 1;

export interface DataType {
  title: string;
  key: string;
  children?: DataType[];
}

const gData: DataType[] = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          { title: "0-0-0-0", key: "0-0-0-0" },
          { title: "0-0-0-1", key: "0-0-0-1" },
          { title: "0-0-0-2", key: "0-0-0-2" },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          { title: "0-0-1-0", key: "0-0-1-0" },
          { title: "0-0-1-1", key: "0-0-1-1" },
          { title: "0-0-1-2", key: "0-0-1-2" },
        ],
      },
      {
        title: "0-0-2",
        key: "0-0-2",
      },
    ],
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      { title: "0-1-0-0", key: "0-1-0-0" },
      { title: "0-1-0-1", key: "0-1-0-1" },
      { title: "0-1-0-2", key: "0-1-0-2" },
    ],
  },
  {
    title: "0-2",
    key: "0-2",
  },
];

// // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// const generateData = (
//   _level: number,
//   _preKey: string | undefined,
//   _tns: { title: string; key: string; children: [] }[] | undefined
// ) => {
//   const preKey = _preKey || "0";
//   const tns = _tns || gData;

//   const children = [];
//   for (let i = 0; i < x; i++) {
//     const key = `${preKey}-${i}`;
//     tns.push({ title: key, key, children: [] });
//     if (i < y) {
//       children.push(key);
//     }
//   }
//   if (_level < 0) {
//     return tns;
//   }
//   const level = _level - 1;
//   children.forEach((key, index) => {
//     tns[index].children = [];
//     return generateData(level, key, tns[index].children);
//   });
// };
// generateData(z, undefined, undefined);

const dataList: { key: string; title: string }[] = [];
const generateList = (data: string | any[]): void => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);

const getParentKey = (key: string, tree: DataType[]): React.Key => {
  let parentKey: React.Key = "";
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item: { key: string }) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

interface Props {}
const LeftSide: React.FC<Props> = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (expandedKeys: React.Key[]): void => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e: { target: { value: any } }): void => {
    console.log(e, dataList, "e");
    const { value } = e.target;
    const arr = dataList
      .filter((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    console.log(arr, "arr");
    const expandedKeys = arr.map((item) => item.key);
    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
    console.log(loop(gData), "loop(gData)");
  };

  const loop = (data: DataType[]): any[] =>
    data.map((item) => {
      const title = (
        <TreeNodeItem
          title={item.title}
          key={item.key}
          name={item.key}
          searchValue={searchValue}
        />
      );

      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });

  return (
    <div className="LeftSide">
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={loop(gData)}
      >
        {/* {loop(gData).map((item) => {
          return <TreeNode title={item.title} key={item.key} />;
        })} */}
      </Tree>
    </div>
  );
};
export default LeftSide;
