import React, { useState, useEffect } from "react";
import { Tree, Input } from "antd";
import TreeNodeItem from "./TreeNodeItem";

const { Search } = Input;

export interface DataType {
  title: string;
  key: string;
  children?: DataType[];
  [key: string]: any;
}

const gData: DataType[] = [
  {
    title: "缓存服务",
    key: "cache",
    active: false,
    children: [
      {
        title: "Zedis",
        key: "Zedis",
        active: true,
        children: [],
      },
      {
        title: "Redis(多活)",
        key: "RedisMulti",
        active: true,
        children: [],
      },
    ],
  },
  {
    title: "数据库服务",
    key: "db",
    active: false,
    children: [
      { title: "DB2", key: "DB2", active: true },
      { title: "Mysql(多活)", key: "MysqlMulti", active: true },
      { title: "Mysql", key: "Mysql", active: true },
    ],
  },
  {
    title: "PostgreSQL",
    key: "PostgreSQL",
    active: true,
  },
];

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
          active={item.active}
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

  useEffect(() => {
    // effect
    // return () => {
    //   cleanup
    // }
  }, []);

  return (
    <div className="LeftSide">
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
      />
      <Tree
        showIcon
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
