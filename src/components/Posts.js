import React, { Component } from "react";
import { connect } from "react-redux";
import sortBy from "lodash.sortby";
import moment from "moment";
import { getPostsByCategory, setPostSort } from "../actions/posts";
import { getCommentsByPostIdList } from "../actions/comments";
import Votes from "./Votes";

class Posts extends Component {
  componentDidMount() {
    this.props.getPostsByCategory(this.props.category).then(postIds => {
      this.props.getCommentsByPostIdList(postIds);
    });
  }
  render() {
    const { items, sortby } = this.props.posts;
    const posts = sortBy(Object.values(items), sortby).reverse();
    const comments = Object.values(this.props.comments.items);
    return (
      <div className="posts">
        Sorted by
        <select
          defaultValue={this.props.posts.sortby}
          onChange={e => this.props.setPostSort(e.target.value)}
        >
          <option value="timestamp">Most Recent</option>
          <option value="voteScore">Most Popular</option>
        </select>
        <ul>
          {posts.map(post => {
            const commentCount = comments.filter(
              comment => comment.parentId === post.id
            ).length;
            return (
              <li key={post.id}>
                <a href={`/posts/${post.id}`}>
                  <h2>{post.title}</h2>
                </a>
                posted {moment(post.timestamp).fromNow()}
                <Votes postId={post.id} />
                <p>{post.body}</p>
                <div>{commentCount} comments</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(state => state, {
  getPostsByCategory,
  setPostSort,
  getCommentsByPostIdList
})(Posts);
