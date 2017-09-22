import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import FourOhFour from "./FourOhFour";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route exact path="/404" component={FourOhFour} />
        <Route exact path="/:category" component={Layout} />
        <Route exact path="/:category/:post_id" component={Layout} />
        <Route component={FourOhFour} />
      </Switch>
    );
  }
}
