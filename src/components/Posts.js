import React, { Component } from "react";
import { connect } from "react-redux";

class Posts extends Component {
  render() {
    return <div>this is a list of posts</div>;
  }
}

export default connect(state => state)(Posts);
