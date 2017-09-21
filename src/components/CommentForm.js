import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { editComment, createComment } from "../actions/comments";

const defaultComment = {
  author: "",
  body: ""
};

class CommentForm extends Component {
  state = { comment: defaultComment, editing: false };

  handleChange = (e, { name, value }) => {
    this.setState({ comment: { ...this.state.comment, [name]: value } });
  };

  handleDelete = e => {
    e.preventDefault();
    console.log("deleted comment");
  };

  handleSubmit = e => {
    e.preventDefault();
    // If we are editing an existing comment we also need to change the state
    // of the parent component.
    if (this.props.commentId) {
      this.props.handleEditingStateChange();
      this.props.editComment(this.state.comment);
    } else {
      this.props.createComment(this.state.comment);
      // reset the comment
      this.setState({
        comment: { ...defaultComment, parentId: this.props.postId }
      });
    }
  };

  componentDidMount() {
    if (this.props.commentId) {
      this.setState({
        comment: this.props.comments.items[this.props.commentId],
        editing: true
      });
    } else {
      this.setState({
        comment: { ...defaultComment, parentId: this.props.postId }
      });
    }
  }

  render() {
    const { author, body } = this.state.comment;

    return (
      <Form reply>
        <Form.Input
          placeholder="Your Name"
          name="author"
          value={author}
          onChange={this.handleChange}
          width={4}
          disabled={this.state.editing}
        />
        <Form.TextArea
          placeholder="Write your comment..."
          name="body"
          value={body}
          onChange={this.handleChange}
          width={16}
        />
        <Button
          content={this.state.editing ? "Submit" : "Add New Comment"}
          labelPosition="left"
          icon="edit"
          primary
          onClick={this.handleSubmit}
        />
        {this.state.editing && (
          <Button
            content="Cancel"
            basic
            floated="right"
            onClick={this.props.handleEditingStateChange}
          />
        )}
      </Form>
    );
  }
}

export default connect(state => state, { editComment, createComment })(
  CommentForm
);
