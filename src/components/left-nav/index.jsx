import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import "./index.less";
const { SubMenu } = Menu;
const menuList = [
  {
    title: "首页",
    path: "/home",
    icon: "home"
  },
  {
    title: "系统管理",
    path: "/sys",
    icon: "appstore",
    children: [
      {
        title: "用户管理",
        path: "/user",
        icon: "user"
      },
      {
        title: "菜单管理",
        path: "/menu",
        icon: "menu"
      },
      {
        title: "角色管理",
        path: "/role",
        icon: "team"
      }
    ]
  }
];
class LeftNav extends Component {
  getMenuNodes = menuList => {
    const path = this.props.location.pathname;
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        if (item.children.find(cItem => path.indexOf(cItem.path) === 0)) {
          this.openKey = item.path;
        }
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }
  render() {
    const selectKey = this.props.location.pathname;
    const openKey = this.openKey;
    return (
      <div className="left-nav">
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectKey]}
          defaultOpenKeys={[openKey]}
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav);
