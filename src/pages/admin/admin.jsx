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

const { Header, Sider, Content } = Layout;
const user = memoryUtils.user;
function isAuthenticated(x) {
  for (var i = 0; i < user.pathList.length; i++) {
    if (user.pathList[i].path === x) {
      return true;
    }
  }
  return false;
}
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated(props.match.path) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

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
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute path="/user" component={User} />
              <PrivateRoute path="/menu" component={MenuManager} />
              <PrivateRoute path="/role" component={Role} /> 
              <Redirect to="/home" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
