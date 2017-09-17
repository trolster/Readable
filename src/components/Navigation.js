import React from "react";
import { connect } from "react-redux";

const Navigation = props => (
  <ul className="nav">
    <li key="all">
      <a href="/">List of links</a>
    </li>
  </ul>
);

export default connect(state => state)(Navigation);
