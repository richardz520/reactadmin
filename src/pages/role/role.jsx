import React, { Component } from "react";
import { Table, Button, Divider, Popconfirm, message } from "antd";
import moment from "moment";
import RoleInfo from "../../components/role-info/role-info";
import { reqRoleList, reqRoleDelete,reqRoleDetail } from "../../api";
export default class Role extends Component {
  columns = [
    {
      title: "名称",
      dataIndex: "name",
      id: "name"
    },
    {
      title: "备注",
      dataIndex: "remark",
      id: "remark"
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
            onClick={() => this.editRole(record.id)}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="你确定要删除该角色吗？"
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
    roleInfoVisible: false,
    roleInfo: {},
    roleInfoTitle: "添加角色",
    roleList: [],
    deleteBtnLoading: false,
    editBtnLoading: false,
    isAdd: true
  };
  getRoleList = async () => {
    const result = await reqRoleList();
    this.setState({
      roleList: result.data
    });
  };
  handleCancel = () => {
    this.setState({
      roleInfoVisible: false
    });
  };
  editRole = async id => {
    this.setState({ editBtnLoading: true });
    const result = await reqRoleDetail(id);
   
    this.setState({
      roleInfoVisible: true,
      roleInfoTitle: "编辑角色",
      roleInfo: result.data,
      isAdd: false,
      editBtnLoading: false
    });

  };
  confirmDelete = id => {
    this.setState({
      deleteBtnLoading: true
    });
    this.deleteRole(id);
  };
  deleteRole = async id => {
    await reqRoleDelete(id);
    this.setState({
      deleteBtnLoading: false
    });
    message.success("删除成功！");
    this.getRoleList();
  };
  addRole = () => {
    this.setState({
      roleInfoVisible: true,
      roleInfoTitle: "添加角色",
      roleInfo: {},
      isAdd: true
    });
  };
  UNSAFE_componentWillMount() {
    this.getRoleList();
  }
  render() {
    return (
      <div>
        <div className="AddBtn">
          <Button icon="plus" type="primary" onClick={() => this.addRole()}>
            添加角色
          </Button>
          <RoleInfo
            show={this.state.roleInfoVisible}
            handleCancel={this.handleCancel}
            roleInfo={this.state.roleInfo}
            refreshRoleList={this.getRoleList}
            pId={this.state.pId}
            isAdd={this.state.isAdd}
            title={this.state.roleInfoTitle}
          />
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.roleList}
          pagination={false}
          rowKey={"id"}
        />
      </div>
    );
  }
}
