import React, { Component } from "react";
import { connect } from "react-redux";

class Post extends Component {
  render() {
    return <div>this is a post</div>;
  }
}

export default connect(state => state)(Post);
