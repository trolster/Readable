import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById } from "../actions/posts";
import { getCommentsByPostId } from "../actions/comments";

class Post extends Component {
  componentDidMount() {
    this.props.getPostById(this.props.postId);
    this.props.getCommentsByPostId(this.props.postId);
  }
  render() {
    const post = this.props.posts.items[this.props.postId];
    const comments = Object.values(this.props.comments.items);
    return (
      <div>
        {post && (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div>
              {comments &&
                comments.map(comment => {
                  return (
                    <pre key={comment.id}>
                      {JSON.stringify(comment, null, 4)}
                    </pre>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => state, { getPostById, getCommentsByPostId })(
  Post
);
