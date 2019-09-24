import React, { Component } from "react";
import {
  Modal,
  Form,
  Input,
  Avatar,
  Menu,
  Dropdown,
  Icon,
  message
} from "antd";

import memoryUtils from "../../utils/memoryUtils";
import { headBaseUrl, reqLogout, reqUserUpdatePwd } from "../../api";

class UserAvatar extends Component {
  state = {
    show: false,
    confirmLoading: false
  };
  menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => this.changePwd()}>
        修改密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={() => this.logout()}>
        退出登录
      </Menu.Item>
    </Menu>
  );
  changePwd = async () => {
    this.setState({
      confirmLoading: false,
      show: true
    });
  };
  logout = async () => {
    await reqLogout();
    message.success("退出成功！");
    memoryUtils.removeUser();
    window.location.href = "/login";
  };
  handleOk = async () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true
        });
        await reqUserUpdatePwd(values.newPwd);
        message.success("修改成功！");
        this.handleCancel();
      }
    });
  };
  handleCancel = () => {
    this.props.form.resetFields();
    this.setState({
      confirmLoading: false,
      show: false
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
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
    const user = memoryUtils.user;
    return (
      <div>
        <Avatar size={48} src={headBaseUrl + user.headimg} />

        <Dropdown overlay={this.menu} trigger={["click"]}>
          <span className="ant-dropdown-link" style={{ cursor: "pointer" }}>
            {user.userName} <Icon type="caret-down" />
          </span>
        </Dropdown>
        <Modal
          title={"密码修改"}
          visible={this.state.show}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form {...formItemLayout} onSubmit={this.handleOk}>
            <Form.Item label="新密码">
              {getFieldDecorator("newPwd", {
                rules: [
                  {
                    required: true,
                    message: "请输入新密码"
                  }
                ]
              })(<Input type="password" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(UserAvatar);
