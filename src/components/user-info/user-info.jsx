import React, { Component } from "react";
import {
  Modal,
  Form,
  Input,
  message,
  Select,
  Upload,
  Button,
  Icon
} from "antd";
import {
  reqUserAdd,
  reqUserUpdate,
  imageUploadUrl
} from "../../api";
const { Option } = Select;

class UserInfo extends Component {
  state = {
    confirmLoading: false,
    imageName: "",
  };

  handleOk = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true
        });
        if (this.props.isAdd) {
          values.headimg = this.state.imageName;
          await reqUserAdd(values);
          message.success("添加成功！");
        } else {
          values.id = this.props.userInfo.id;
          values.headimg = this.state.imageName;
          await reqUserUpdate(values);
          message.success("修改成功！");
        }
        this.handleCancel();
      }
    });
  };
  handleCancel = () => {
    this.props.form.resetFields();
    this.props.refreshUserList();
    this.props.handleCancel();
    this.setState({
      confirmLoading: false
    });
  };
  handleChange = info => {
    if (info.file.status === "done") {
      this.setState({
        imageName: info.file.response
      });
    }
  };

 
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      imageName: nextProps.userInfo.headImgUrl || ""
    });
  }
  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  render() {
    const { confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const {
      username,
      password,
      mobile,
      status,
      headImgUrl,
      roleid
    } = this.props.userInfo;

    const children = [];
    for (let i = 0; i < this.props.roleList.length; i++) {
      children.push(
        <Option
          key={this.props.roleList[i].id}
          value={this.props.roleList[i].id}
        >
          {this.props.roleList[i].name}
        </Option>
      );
    }
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
            <Form.Item label="用户名">
              {getFieldDecorator("username", {
                initialValue: username || "",
                rules: [{ required: true, message: "请输入角色名称！" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator("password", {
                initialValue: password || "",
                rules: [{ required: true, message: "请输入密码!" }]
              })(<Input type="password" />)}
            </Form.Item>
            <Form.Item label="手机号">
              {getFieldDecorator("mobile", {
                initialValue: mobile || ""
              })(<Input maxLength={11} />)}
            </Form.Item>
            <Form.Item label="状态">
              {getFieldDecorator("status", {
                initialValue: status || 1,
                rules: [{ required: true, message: "请选择状态!" }]
              })(
                <Select>
                  <Option value={1}>正常</Option>
                  <Option value={0}>禁用</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="角色">
              {getFieldDecorator("roleid", {
                initialValue: roleid || "",
                rules: [{ required: true, message: "请选择角色!" }]
              })(<Select>{children}</Select>)}
            </Form.Item>
            <Form.Item label="头像">
              {getFieldDecorator("headimg", {
                valuePropName: "fileList",
                getValueFromEvent: this.normFile
              })(
                <Upload
                  name="image"
                  action={imageUploadUrl}
                  listType="picture"
                  onChange={this.handleChange}
                >
                  {headImgUrl ? (
                    <img
                      src={headImgUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <span></span>
                  )}
                  <Button>
                    <Icon type="upload" /> 点击上传
                  </Button>
                </Upload>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(UserInfo);
