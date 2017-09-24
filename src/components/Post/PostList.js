import React, { Component } from "react";
import { connect } from "react-redux";
import sortBy from "lodash.sortby";
import startCase from "lodash.startcase";
import { Segment, Container, Header, Comment } from "semantic-ui-react";
import {
  getPostsByCategory,
  setPostSort,
  getCommentsByPostIdList
} from "../../actions";
import { PostForm, PostStub, Sort, Spinner } from "../";

class PostList extends Component {
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
    if (!this.state.loaded) {
      return <Spinner />;
    }
    if (!Object.keys(items).length) {
      return (
        <Segment basic>
          <Container text>
            <Header as="h3">{startCase(this.props.category)} Posts</Header>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexFlow: "column",
                height: "20vh",
                color: "#444"
              }}
            >
              <h4>Be the first to write a post in this category!</h4>
            </div>
            <PostForm category={this.props.category} />
          </Container>
        </Segment>
      );
    }
    const posts = sortBy(Object.values(items), sortby).reverse();
    return (
      <Segment basic>
        <Container text>
          {posts.length > 1 && <Sort itemType="posts" />}
          <Header as="h3" dividing>
            {startCase(this.props.category)} Posts
          </Header>
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
})(PostList);
