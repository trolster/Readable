import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import sortBy from "lodash.sortby";
import moment from "moment";
import { Comment, Header } from "semantic-ui-react";
import { deletePost } from "../actions/posts";
import Votes from "./Votes";
import Sort from "./Sort";
import CommentItem from "./CommentItem";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      redirect: false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.setState({ redirect: true, deleted: true });
    this.props.deletePost(this.props.postId).catch(error => {
      console.log(error);
    });
  }

  render() {
    if (this.state.deleted) {
      return <Redirect to="/" />;
    }
    const post = this.props.posts.items[this.props.postId];
    const { items, sortby } = this.props.comments;
    const comments = sortBy(
      // Start by filtering out the comments that aren't for this post.
      Object.values(items).filter(comment => comment.parentId === post.id),
      sortby
    ).reverse();
    return (
      <div style={{ display: "flex", flexAlign: "row" }} key={post.id}>
        <Votes postId={post.id} />
        <Comment.Group>
          <Comment style={{ marginLeft: "15px" }}>
            <Comment.Avatar src="http://via.placeholder.com/35" />
            <Comment.Content>
              <Comment.Author>{post.author}</Comment.Author>
              <Comment.Metadata>
                posted {moment(post.timestamp).fromNow()}
              </Comment.Metadata>
              <Header as="h3" style={{ margin: ".33em 0" }}>
                {post.title}
              </Header>
              <Comment.Text>{post.body}</Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={this.props.handleEditingStateChange}>
                  Edit
                </Comment.Action>
                <Comment.Action onClick={this.handleDelete}>
                  Delete
                </Comment.Action>
              </Comment.Actions>
            </Comment.Content>
            {comments && (
              <Comment.Group>
                {comments.length > 1 && <Sort itemType="comments" />}
                {comments.map(comment => {
                  return (
                    <CommentItem key={comment.id} commentId={comment.id} />
                  );
                })}
              </Comment.Group>
            )}
          </Comment>
        </Comment.Group>
      </div>
    );
  }
}

export default connect(state => state, {
  deletePost
})(Post);