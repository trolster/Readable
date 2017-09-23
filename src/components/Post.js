import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Segment, Container } from "semantic-ui-react";
import { getPostById, getCommentsByPostId } from "../actions";
import PostForm from "./PostForm";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import Spinner from "./Spinner";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      redirect: false
    };
    this.handleEditingStateChange = this.handleEditingStateChange.bind(this);
  }

  handleEditingStateChange(e) {
    e.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  componentDidMount() {
    // If the user navigates to the page from a bookmark, we load post and
    // comments.
    if (!this.props.posts.items[this.props.postId]) {
      this.props.getPostById(this.props.postId).catch(response => {
        // Redirect if the post doesn't exist.
        this.setState({ redirect: true });
      });
      this.props.getCommentsByPostId(this.props.postId);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/404" />;
    }

    const post = this.props.posts.items[this.props.postId];
    if (post) {
      return (
        <Segment basic>
          <Container text>
            {!this.state.editing && (
              <PostItem
                postId={post.id}
                handleEditingStateChange={this.handleEditingStateChange}
              />
            )}
            {this.state.editing && (
              <PostForm
                postId={post.id}
                handleEditingStateChange={this.handleEditingStateChange}
              />
            )}
            <CommentForm postId={post.id} />
          </Container>
        </Segment>
      );
    }
    return <Spinner />;
  }
}

export default connect(state => state, {
  getPostById,
  getCommentsByPostId
})(Post);
