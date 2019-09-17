import React, { Component } from "react";
import { Table, Button } from "antd";
import "./menu-manager.less";
const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号"
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号"
  }
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address"
  }
];

export default class MenuManager extends Component {
  addMenu = () => {
      console.log("add menu");
  };
  render() {
    return (
      <div>
        <div className="AddMenuBtn">
          <Button type="primary" onClick={this.addMenu}>
            添加一级菜单
          </Button>
        </div>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    );
  }
}
