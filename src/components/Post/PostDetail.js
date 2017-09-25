import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Segment, Container, Header } from "semantic-ui-react";
import { getPostById, getCommentsByPostId } from "../../actions";
import { PostItem, CommentForm, Spinner } from "../";

class PostDetail extends Component {
  state = { redirect: false };
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
            <PostItem postId={post.id} showComments />
            <Header as="h3" dividing>
              Add a Comment
            </Header>
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
})(PostDetail);
