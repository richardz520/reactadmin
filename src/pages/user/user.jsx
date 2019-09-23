import React, { Component } from "react";
import { Avatar, Table, Button, Divider, Popconfirm, message } from "antd";
import moment from "moment";
import UserInfo from "../../components/user-info/user-info";

import {
  headBaseUrl,
  reqUserList,
  reqUserDelete,
  reqRoleList,
  reqUserDetail
} from "../../api";

export default class User extends Component {
  columns = [
    {
      title: "用户名",
      dataIndex: "username",
      id: "username"
    },
    {
      title: "头像",
      dataIndex: "headimg",
      id: "headimg",
      render: val => <Avatar src={headBaseUrl + val} />
    },
    {
      title: "角色",
      dataIndex: "roleid",
      id: "roleid",
      render: val => (
        <span>
          {this.state.roleList.map(role => {
            if (role.id === val) {
              return role.name;
            }
            return "";
          })}
        </span>
      )
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      id: "mobile"
    },
    {
      title: "状态",
      dataIndex: "status",
      id: "status",
      render: val => <span>{val === 1 ? "正常" : "禁用"}</span>
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      id: "createTime",
      render: val => <span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>
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
            onClick={() => this.editUser(record.id)}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="你确定要删除该用户吗？"
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
  state = {
    userInfoVisible: false,
    userInfo: {},
    userInfoTitle: "添加用户",
    userList: [],
    deleteBtnLoading: false,
    editBtnLoading: false,
    isAdd: true,
    totalUser: 0,
    roleList: []
  };
  getUserList = async (page, pageSize) => {
    const result = await reqUserList(page, pageSize);
    this.setState({
      userList: result.data.list,
      totalUser: result.data.total
    });
  };
  handleCancel = () => {
    this.setState({
      userInfoVisible: false
    });
  };
  editUser = async id => {
    this.setState({ editBtnLoading: true });
    const result = await reqUserDetail(id);
    this.setState({
      userInfoVisible: true,
      userInfoTitle: "编辑角色",
      userInfo: result.data,
      isAdd: false,
      editBtnLoading: false
    });
  };
  confirmDelete = id => {
    this.setState({
      deleteBtnLoading: true
    });
    this.deleteUser(id);
  };
  deleteUser = async id => {
    await reqUserDelete(id);
    this.setState({
      deleteBtnLoading: false
    });
    message.success("删除成功！");
    this.getUserList();
  };
  addUser = () => {
    this.setState({
      userInfoVisible: true,
      userInfoTitle: "添加用户",
      userInfo: {},
      isAdd: true
    });
  };
  UNSAFE_componentWillMount() {
    this.getUserList(1, 5);
    this.getRoleList();
  }
  pageChange = (page, pageSize) => {
    this.getUserList(page, pageSize);
  };
  getRoleList = async () => {
    const result = await reqRoleList();
    this.setState({
      roleList: result.data
    });
  };
  render() {
    return (
      <div>
        <div className="AddBtn">
          <Button icon="plus" type="primary" onClick={() => this.addUser()}>
            添加用户
          </Button>
          <UserInfo
            show={this.state.userInfoVisible}
            handleCancel={this.handleCancel}
            userInfo={this.state.userInfo}
            refreshUserList={this.getUserList}
            isAdd={this.state.isAdd}
            title={this.state.userInfoTitle}
            roleList={this.state.roleList}
          />
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.userList}
          rowKey={"id"}
          pagination={{
            onChange: this.pageChange,
            total: this.state.totalUser,
            defaultPageSize: 5
          }}
        />
      </div>
    );
  }
}
