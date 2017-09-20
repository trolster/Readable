import React, { Component } from "react";
import { Form, Button, Select } from "semantic-ui-react";
import { connect } from "react-redux";

const defaultPost = {
  category: "",
  author: "",
  title: "",
  body: ""
};

class PostForm extends Component {
  state = {
    post: !!this.props.postId
      ? this.props.posts.items[this.props.postId]
      : defaultPost,
    isEditing: !!this.props.postId,
    submitted: false
  };
  handleChange = (e, { name, value }) => console.log(this.props);

  handleDelete = e => {
    console.log("Deleting Post");
  };

  handleSubmit = e => {
    setTimeout(() => {
      console.log(this.props);
    }, 2000);
  };

  render() {
    const { author, title, body } = this.state.post;
    return (
      <Form
        reply
        onSubmit={this.handleSubmit}
        loading={this.state.submitted}
        style={{ margin: "15px 0 0 15px" }}
      >
        <Form.Group>
          <Form.Field
            control={Select}
            options={this.props.categories.map(category => ({
              key: category.name,
              text: category.name,
              value: category.name
            }))}
            value={this.state.post.category}
            name="category"
            placeholder="Category"
            onChange={this.handleChange}
            disabled={this.state.isEditing}
          />
          <Form.Input
            placeholder="Name"
            name="author"
            value={author}
            onChange={this.handleChange}
            disabled={this.state.isEditing}
          />
          <Form.Input
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
            disabled={this.state.isEditing}
          />
        </Form.Group>
        <Form.TextArea
          placeholder="Write your post..."
          name="body"
          value={body}
          onChange={this.handleChange}
        />
        <Button
          content={this.state.isEditing ? "Submit" : "Add New Post"}
          labelPosition="left"
          icon="edit"
          primary
        />
        {this.state.isEditing && (
          <span>
            <Button
              content="Delete"
              basic
              floated="right"
              onClick={this.handleDelete}
            />
            <Button
              content="Cancel"
              basic
              floated="right"
              onClick={this.props.handleEditStateChange}
            />
          </span>
        )}
      </Form>
    );
  }
}

export default connect(state => state)(PostForm);
