import React, { Component } from "react";
import { Table, Button, Divider, Popconfirm, message } from "antd";
import "./menu-manager.less";
import MenuInfo from "../../components/menu-info/menu-info";
import { reqMenuList, reqMenuDelete, reqMenuDetail } from "../../api";

export default class MenuManager extends Component {
  state = {
    menuInfoVisible: false,
    menuInfo: {},
    menuInfoTitle: "添加菜单",
    pId: 0,
    menuList: [],
    deleteBtnLoading: false,
    editBtnLoading: false,
    isAdd: true
  };
  columns = [
    {
      title: "名称",
      dataIndex: "title",
      id: "title"
    },
    {
      title: "路径",
      dataIndex: "path",
      id: "path"
    },
    {
      title: "组件",
      dataIndex: "component",
      id: "component"
    },
    {
      title: "排序",
      dataIndex: "sort",
      id: "sort"
    },
    {
      title: "图标",
      dataIndex: "icon",
      id: "icon"
    },
    {
      title: "备注",
      dataIndex: "remark",
      id: "remark"
    },
    {
      title: "操作",
      id: "action",
      render: (text, record) => (
        <span>
          <Button
            icon="edit"
            type="primary"
            loading={this.state.editBtnLoading}
            onClick={() => this.editMenu(record.id)}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            icon="plus"
            type="primary"
            onClick={() => this.addMenu(record.id)}
          >
            添加子菜单
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="你确定要删除本菜单及其子菜单吗？"
            onConfirm={() => this.confirmDelete(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button
              icon="delete"
              type="danger"
              loading={this.state.deleteBtnLoading}
            >
              删除
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ];
  deleteMenu = async id => {
    await reqMenuDelete(id);
    this.setState({
      deleteBtnLoading: false
    });
    message.success("删除成功！");
    this.getMenuList();
  };
  confirmDelete = id => {
    this.setState({
      deleteBtnLoading: true
    });
    this.deleteMenu(id);
  };

  editMenu = async id => {
    this.setState({ editBtnLoading: true });
    const result = await reqMenuDetail(id);
    this.setState({
      menuInfoVisible: true,
      menuInfoTitle: "编辑菜单",
      pId: result.data.pid,
      menuInfo: result.data,
      isAdd: false,
      editBtnLoading: false
    });
  };
  addMenu = id => {
    this.setState({
      menuInfoVisible: true,
      menuInfoTitle: "添加菜单",
      pId: id,
      menuInfo: {},
      isAdd: true
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
        <div className="AddBtn">
          <Button icon="plus" type="primary" onClick={() => this.addMenu(0)}>
            添加一级菜单
          </Button>
          <MenuInfo
            show={this.state.menuInfoVisible}
            handleCancel={this.handleCancel}
            menuInfo={this.state.menuInfo}
            refreshMenuList={this.getMenuList}
            pId={this.state.pId}
            isAdd={this.state.isAdd}
            title={this.state.menuInfoTitle}
          />
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.menuList}
          pagination={false}
          rowKey={'id'}
        />
      </div>
    );
  }
}
