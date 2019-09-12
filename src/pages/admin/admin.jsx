import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user.id) {
      return <Redirect to="/login" />; // 自动跳转到指定的路由路径
    }
    return <div>admin</div>;
  }
}
