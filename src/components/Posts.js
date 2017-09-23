import React, { Component } from "react";
import { connect } from "react-redux";
import sortBy from "lodash.sortby";
import startCase from "lodash.startcase";
import { Segment, Container, Header, Comment } from "semantic-ui-react";
import {
  getPostsByCategory,
  setPostSort,
  getCommentsByPostIdList
} from "../actions";
import Sort from "./Sort";
import PostForm from "./PostForm";
import PostStub from "./PostStub";
import Spinner from "./Spinner";

class Posts extends Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    this.props.getPostsByCategory(this.props.category).then(postIds => {
      this.props.getCommentsByPostIdList(postIds).then(() => {
        this.setState({ loaded: true });
      });
    });
  }

  render() {
    const { items, sortby } = this.props.posts;
    const posts = sortBy(Object.values(items), sortby).reverse();
    if (!this.state.loaded) {
      return <Spinner />;
    }
    return (
      <Segment basic>
        <Container text>
          <Header as="h3">{startCase(this.props.category)} Posts</Header>
          {posts.length > 1 && <Sort itemType="posts" />}
          <Comment.Group>
            {posts.map(post => <PostStub postId={post.id} key={post.id} />)}
          </Comment.Group>
          <PostForm category={this.props.category} />
        </Container>
      </Segment>
    );
  }
}

export default connect(state => state, {
  getPostsByCategory,
  setPostSort,
  getCommentsByPostIdList
})(Posts);
