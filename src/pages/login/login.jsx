import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Form, Input, Icon, Button,message } from "antd";
import "./login.less";
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqLogin } from '../../api'

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, { username, password }) => {
      if (!err) {
        const result = await reqLogin(username, password);
        if (result.code === 200) {
          const user = result.data;
          storageUtils.saveUser(user);
          memoryUtils.user = user;
          this.props.history.replace("/");
          message.success("登陆成功!");
        } else {
          message.error(result.message);
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const user = memoryUtils.user
    if (user.id) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div className="login">
          <header className="login-header">
            <h1>后台管理系统</h1>
          </header>
          <section className="login-content">
            <h3>用户登录</h3>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "请输入用户名!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="用户名"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入密码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </section>
        </div>
      </div>
    );
  }
}
export default Form.create()(Login);
