import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route exact path="/:category" component={Layout} />
        <Route exact path="/:category/:post_id" component={Layout} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    );
  }
}
