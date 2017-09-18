import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostsByCategory } from "../actions/posts";
import { getCommentsByPostIdList } from "../actions/comments";

class Posts extends Component {
  componentDidMount() {
    this.props.getPostsByCategory(this.props.category).then(postIds => {
      this.props.getCommentsByPostIdList(postIds);
    });
  }
  render() {
    console.log(this.props);
    return (
      <ul className="posts">
        <li>This is a list of Posts</li>
      </ul>
    );
  }
}

export default connect(state => state, {
  getPostsByCategory,
  getCommentsByPostIdList
})(Posts);
