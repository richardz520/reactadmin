import React, { Component } from "react";
import { Modal, Form, Input, message, Table } from "antd";
import { reqMenuList, reqRoleAdd, reqRoleUpdate } from "../../api";
class RoleInfo extends Component {
  columns = [
    {
      title: "Name",
      dataIndex: "title",
      id: "name"
    }
  ];
  state = {
    confirmLoading: false,
    menuList: [],
    selectedRowKeys: [],
    selectMenuIds: ""
  };
  getMeunList = async () => {
    const result = await reqMenuList();
    this.setState({
      menuList: result.data
    });
  };
  UNSAFE_componentWillMount() {
    this.getMeunList();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      selectedRowKeys: nextProps.roleInfo.menuList || []
    });
  }
  handleOk = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true
        });
        if (this.props.isAdd) {
          await reqRoleAdd(
            values.name,
            values.remark,
            this.state.selectMenuIds
          );
          message.success("添加成功！");
        } else {
          await reqRoleUpdate(
            this.props.roleInfo.id,
            values.name,
            values.remark,
            this.state.selectMenuIds
          );
          message.success("修改成功！");
        }
        this.handleCancel();
      }
    });
  };
  handleCancel = () => {
    this.props.form.resetFields();
    this.props.refreshRoleList();
    this.props.handleCancel();
    this.setState({
      selectedRowKeys: [],
      confirmLoading: false
    });
  };
  onSelectChange = (selectedRowKeys, selectedRows) => {
    var menuIds = "0";
    for (var i = 0; i < selectedRowKeys.length; i++) {
      menuIds += ",";
      menuIds += selectedRowKeys[i];
    }
    this.setState({
      selectMenuIds: menuIds,
      selectedRowKeys: selectedRowKeys
    });
  };

  render() {
    const { confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { name, remark } = this.props.roleInfo;
    const formItemLayout = {
      labelCol: {
        xs: { span: 5 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const rowSelection = {
      onChange: this.onSelectChange,
      selectedRowKeys: this.state.selectedRowKeys
    };
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={this.props.show}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form {...formItemLayout} onSubmit={this.handleOk}>
            <Form.Item label="角色名称">
              {getFieldDecorator("name", {
                initialValue: name || "",
                rules: [{ required: true, message: "请输入角色名称！" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="备注">
              {getFieldDecorator("remark", { initialValue: remark || "" })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="角色资源">
              <Table
                columns={this.columns}
                rowSelection={rowSelection}
                dataSource={this.state.menuList}
                pagination={false}
                showHeader={false}
                rowKey={"id"}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(RoleInfo);
