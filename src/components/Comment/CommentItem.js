import React, { Component } from "react";
import { connect } from "react-redux";
import { Comment } from "semantic-ui-react";
import {
  getCommentsByPostId,
  setCommentSort,
  deleteComment
} from "../../actions";
import { Votes, CommentForm, DateFromTimestamp } from "../";

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    this.handleEditingStateChange = this.handleEditingStateChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.deleteComment(this.props.commentId);
  }

  handleEditingStateChange(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({ editing: !this.state.editing });
  }

  render() {
    const comment = this.props.comments.items[this.props.commentId];
    const { id, author, timestamp, body } = comment;
    if (this.state.editing)
      return (
        <CommentForm
          commentId={id}
          handleEditingStateChange={this.handleEditingStateChange}
        />
      );
    return (
      <div className="comment-list-item" key={id}>
        <Votes commentId={id} />
        <Comment>
          <Comment.Content>
            <Comment.Author as="a">{author}</Comment.Author>
            <Comment.Metadata>
              <DateFromTimestamp timestamp={timestamp} />
            </Comment.Metadata>
            <Comment.Text>{body}</Comment.Text>
            <Comment.Actions>
              <Comment.Action onClick={this.handleEditingStateChange}>
                Edit
              </Comment.Action>
              <Comment.Action onClick={this.handleDelete}>
                Delete
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </div>
    );
  }
}

export default connect(state => state, {
  getCommentsByPostId,
  setCommentSort,
  deleteComment
})(CommentItem);
