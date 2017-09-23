import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Comment } from "semantic-ui-react";
import { getCommentsByPostId, setCommentSort, deleteComment } from "../actions";
import Votes from "./Votes";
import CommentForm from "./CommentForm";

class Post extends Component {
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
    if (e) e.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  render() {
    const { id, author, timestamp, body } = this.props.comments.items[
      this.props.commentId
    ];
    const Item = () => (
      <div style={{ display: "flex", flexAlign: "row" }} key={id}>
        <Votes commentId={id} />
        <Comment style={{ marginLeft: "15px" }}>
          <Comment.Content>
            <Comment.Author as="a">{author}</Comment.Author>
            <Comment.Metadata>
              posted {moment(timestamp).fromNow()}
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
    if (this.state.editing)
      return (
        <CommentForm
          commentId={id}
          handleEditingStateChange={this.handleEditingStateChange}
        />
      );
    return <Item />;
  }
}

export default connect(state => state, {
  getCommentsByPostId,
  setCommentSort,
  deleteComment
})(Post);
