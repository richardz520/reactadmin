import React, { Component } from "react";
import { Avatar, Menu, Dropdown, Icon } from "antd";
import memoryUtils from "../../utils/memoryUtils";
import {headBaseUrl} from "../../api"
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">修改密码</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">退出登录</Menu.Item>
  </Menu>
);
export default class UserAvatar extends Component {
  render() {
    const user = memoryUtils.user;
    return (
      <div>
        <Avatar
          size={48}
          src={headBaseUrl+user.headimg}
        />
        <Dropdown overlay={menu} trigger={["click"]}>
          <span className="ant-dropdown-link" style={{ cursor: "pointer" }}>
            {user.username} <Icon type="caret-down" />
          </span>
        </Dropdown>
      </div>
    );
  }
}
