import React, { Component } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Admin} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
