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
    const posts = this.props.posts.items;
    const comments = Object.values(this.props.comments.items);
    return (
      <ul className="posts">
        {Object.values(posts).map(post => {
          const commentCount = comments.filter(
            comment => comment.parentId === post.id
          ).length;
          return (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <div>{commentCount} comments</div>
              <p>{post.body}</p>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default connect(state => state, {
  getPostsByCategory,
  getCommentsByPostIdList
})(Posts);
