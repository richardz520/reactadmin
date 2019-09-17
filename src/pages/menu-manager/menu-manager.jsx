import React, { Component } from "react";
import { Table, Button, Divider } from "antd";
import "./menu-manager.less";
import MenuInfo from "../../components/menu-info/menu-info";
import { reqMenuList } from "../../api";

export default class MenuManager extends Component {
  state = {
    menuInfoVisible: false,
    menuInfo: [],
    menuInfoTitle: "添加菜单",
    pId: 0,
    menuList: []
  };
  columns = [
    {
      title: "名称",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "路径",
      dataIndex: "path",
      key: "path"
    },
    {
      title: "组件",
      dataIndex: "component",
      key: "component"
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort"
    },
    {
      title: "图标",
      dataIndex: "icon",
      key: "icon"
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark"
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => this.editMenu(record.key)}>
            编辑
          </Button>
          <Divider type="vertical" />
          <Button type="primary" onClick={() => this.addMenu(record.key)}>
            添加子菜单
          </Button>
          <Divider type="vertical" />
          <Button type="danger" onClick={() => this.deleteMenu(record.key)}>
            删除
          </Button>
        </span>
      )
    }
  ];
  deleteMenu = id => {};

  editMenu = id => {};
  addMenu = id => {
    this.setState({
      menuInfoVisible: true,
      menuInfoTitle: "添加菜单",
      pId: id
    });
  };
  handleCancel = () => {
    this.setState({
      menuInfoVisible: false
    });
  };
  getMenuList = async () => {
    const result = await reqMenuList();
    this.setState({
      menuList: result.data
    });
  };
  UNSAFE_componentWillMount() {
    this.getMenuList();
  }
  render() {
    return (
      <div>
        <div className="AddMenuBtn">
          <Button type="primary" onClick={() => this.addMenu(0)}>
            添加一级菜单
          </Button>
          <MenuInfo
            show={this.state.menuInfoVisible}
            handleCancel={this.handleCancel}
            menuInfo={this.state.menuInfo}
            onSubmit={this.getMenuList}
            pId={this.state.pId}
            title={this.state.menuInfoTitle}
          />
        </div>
        <Table columns={this.columns} dataSource={this.state.menuList} />;
      </div>
    );
  }
}
