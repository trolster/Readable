import React, { Component } from "react";
import { Form, Button, Select } from "semantic-ui-react";
import { connect } from "react-redux";
import { editPost, createNewPost } from "../../actions";

const defaultPost = {
  author: "",
  title: "",
  body: ""
};

class PostForm extends Component {
  state = {
    post: !!this.props.postId
      ? this.props.posts.items[this.props.postId]
      : { ...defaultPost, category: this.props.category },
    editing: !!this.props.postId
  };

  handleChange = (e, { name, value }) => {
    e.preventDefault();
    this.setState({ post: { ...this.state.post, [name]: value } });
  };

  handleSubmit = e => {
    if (this.props.postId) {
      this.props.handleEditingStateChange(e);
      this.props.editPost(this.state.post);
    } else {
      this.props.createNewPost(this.state.post);
      this.setState({ post: defaultPost });
    }
  };

  render() {
    const { author, title, body } = this.state.post;
    const category = this.props.category === "all" ? "" : this.props.category;
    return (
      <Form reply>
        <Form.Group style={{ width: "100%" }}>
          <Form.Field
            control={Select}
            options={this.props.categories.map(category => ({
              key: category.name,
              text: category.name,
              value: category.name
            }))}
            value={this.state.post.category || category}
            name="category"
            placeholder="Category"
            onChange={this.handleChange}
            disabled={this.state.editing}
          />
          <Form.Input
            placeholder="Name"
            name="author"
            value={author}
            onChange={this.handleChange}
            disabled={this.state.editing}
          />
        </Form.Group>
        <Form.Input
          placeholder="Title"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <Form.TextArea
          placeholder="Write your post..."
          name="body"
          value={body}
          onChange={this.handleChange}
        />
        <Button
          content={this.state.editing ? "Submit" : "Add New Post"}
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

export default connect(state => state, { editPost, createNewPost })(PostForm);
