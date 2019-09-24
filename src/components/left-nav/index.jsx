import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import memoryUtils from "../../utils/memoryUtils"
import "./index.less";
const { SubMenu } = Menu;

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
    
    this.menuNodes = this.getMenuNodes(memoryUtils.user.menuList||[]);
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
