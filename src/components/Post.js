import React, { Component } from "react";
import { connect } from "react-redux";
import sortBy from "lodash.sortby";
import moment from "moment";
import { getPostById } from "../actions/posts";
import { getCommentsByPostId, setCommentSort } from "../actions/comments";
import Votes from "./Votes";

class Post extends Component {
  componentDidMount() {
    this.props.getPostById(this.props.postId);
    this.props.getCommentsByPostId(this.props.postId);
  }
  render() {
    const post = this.props.posts.items[this.props.postId];
    const { items, sortby } = this.props.comments;
    const comments = sortBy(Object.values(items), sortby).reverse();
    return (
      <div>
        {post && (
          <div>
            <h2>{post.title}</h2>
            posted {moment(post.timestamp).fromNow()}
            <Votes postId={post.id} />
            <p>{post.body}</p>
            <div>
              {comments && (
                <div className="comments" style={{ marginLeft: "40px" }}>
                  Sorted by
                  <select
                    defaultValue={this.props.comments.sortby}
                    onChange={e => this.props.setCommentSort(e.target.value)}
                  >
                    <option value="timestamp">Most Recent</option>
                    <option value="voteScore">Most Popular</option>
                  </select>
                  {comments.map(comment => {
                    return (
                      <div className="comment" key={comment.id}>
                        posted {moment(comment.timestamp).fromNow()}
                        <Votes commentId={comment.id} />
                        <p>{comment.body}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => state, {
  getPostById,
  getCommentsByPostId,
  setCommentSort
})(Post);
