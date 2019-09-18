import React, { Component } from "react";
import { Modal, Form, Input, message, InputNumber } from "antd";
import { reqMenuAdd, reqMenuUpdate } from "../../api";
class MenuInfo extends Component {
  state = {
    confirmLoading: false
  };

  handleOk = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true
        });
        values.pid = this.props.pId;
        if (this.props.isAdd) {
          await reqMenuAdd(values);
          message.success("添加成功！");
        } else {
          values.id = this.props.menuInfo.id;
          await reqMenuUpdate(values);
          message.success("修改成功！");
        }
        this.handleCancel();
        this.props.refreshMenuList();
        this.setState({
          confirmLoading: false
        });
      }
    });
  };
  handleCancel=()=>{
    this.props.form.resetFields();
    this.props.handleCancel();
  }
  UNSAFE_componentWillMount() {}
  render() {
    const { confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { title, path, component, sort, icon, remark } = this.props.menuInfo;
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
          <Form
            {...formItemLayout}
            onSubmit={this.handleOk}
            className="login-form"
          >
            <Form.Item label="标题">
              {getFieldDecorator("title", {
                initialValue: title || "",
                rules: [{ required: true, message: "请输入菜单标题！" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="路径">
              {getFieldDecorator("path", {
                initialValue: path || "",
                rules: [{ required: true, message: "请输入路径地址！" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="组件">
              {getFieldDecorator("component", {
                initialValue: component || "",
                rules: [{ required: true, message: "请输入组件名称！" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="排序">
              {getFieldDecorator("sort", { initialValue: sort || 1 })(
                <InputNumber min={1} max={100} />
              )}
            </Form.Item>
            <Form.Item label="图标">
              {getFieldDecorator("icon", { initialValue: icon || "" })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="备注">
              {getFieldDecorator("remark", { initialValue: remark || "" })(
                <Input />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(MenuInfo);
