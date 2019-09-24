import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout, Icon } from "antd";
import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav";
import UserAvatar from "../../components/user-avatar/user-avatar";
import Home from "../home/home";
import User from "../user/user";
import MenuManager from "../menu-manager/menu-manager";
import Role from "../role/role";
import "./admin.less";
import Item from "antd/lib/list/Item";

const { Header, Sider, Content } = Layout;

export default class Admin extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const user = memoryUtils.user;
    if (!user.id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <LeftNav />
        </Sider>
        <Layout>
          <Header
            style={{ background: "#fff", padding: 0, display: "inline-flex" }}
          >
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            <div className="user-avatar">
              <UserAvatar />
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            <Switch>
            user.pathList.map(item=>
            {
               <Route path= {item.path} component={item.component}/>

            })
              <Route path="/home" component={Home} />
              <Route path="/user" component={User} />
              <Route path="/menu" component={MenuManager} />
              <Route path="/role" component={Role} />
              <Redirect to="/home" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
