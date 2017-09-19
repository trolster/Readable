import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById } from "../actions/posts";
import { getCommentsByPostId } from "../actions/comments";
import Votes from "./Votes";

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
            <Votes postId={post.id} />
            <p>{post.body}</p>
            <div>
              {comments &&
                comments.map(comment => {
                  return (
                    <div
                      className="comment"
                      key={comment.id}
                      style={{ marginLeft: "40px" }}
                    >
                      <Votes commentId={comment.id} />
                      <p>{comment.body}</p>
                    </div>
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
