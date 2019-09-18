import React, { Component } from "react";
import { Modal, Form, Input, message,InputNumber } from "antd";
import { reqAddMenu } from "../../api";
class MenuInfo extends Component {
  state = {
    confirmLoading: false,
    menuInfo: {}
  };

  handleOk = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true
        });
        values.pid = this.props.pId;
        await reqAddMenu(values);
        message.success("操作成功！");
        this.setState({
          menuInfo: { title: "" }
        });
        console.log(this.state.menuInfo.title);
        this.props.handleCancel();
        this.props.refreshMenuList();
        this.setState({
          confirmLoading: false
        });
      }
    });
  };
  UNSAFE_componentWillMount() {}
  render() {
    const { confirmLoading } = this.state;
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
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={this.props.show}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.props.handleCancel}
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
                initialValue: this.state.menuInfo.title,
                rules: [{ required: true, message: "请输入菜单标题！" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="路径">
              {getFieldDecorator("path", {
                rules: [{ required: true, message: "请输入路径地址！" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="组件">
              {getFieldDecorator("component", {
                rules: [{ required: true, message: "请输入组件名称！" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="排序">
              {getFieldDecorator("sort", { initialValue: 1 })(
                <InputNumber min={1} max={100} />
              )}
            </Form.Item>
            <Form.Item label="图标">
              {getFieldDecorator("icon", {})(<Input />)}
            </Form.Item>
            <Form.Item label="备注">
              {getFieldDecorator("remark", {})(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(MenuInfo);
