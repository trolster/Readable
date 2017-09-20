import React, { Component } from "react";
import { connect } from "react-redux";
import sortBy from "lodash.sortby";
import moment from "moment";
import { Segment, Container, Comment, Header } from "semantic-ui-react";
import { getPostById } from "../actions/posts";
import { getCommentsByPostId, setCommentSort } from "../actions/comments";
import Votes from "./Votes";
import Sort from "./Sort";
import PostForm from "./PostForm";

class Post extends Component {
  state = {
    editing: true
  };
  componentDidMount() {
    this.props.getPostById(this.props.postId);
    this.props.getCommentsByPostId(this.props.postId);
  }
  render() {
    const post = this.props.posts.items[this.props.postId];
    const { items, sortby } = this.props.comments;
    const comments = sortBy(Object.values(items), sortby).reverse();
    return (
      <Segment basic>
        <Container text>
          {post && (
            <div style={{ display: "flex", flexAlign: "row" }} key={post.id}>
              <Votes postId={post.id} />
              {!this.state.editing && (
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
                    </Comment.Content>
                    {comments && (
                      <Comment.Group>
                        <Sort itemType="comments" />
                        {comments.map(comment => {
                          return (
                            <div
                              style={{ display: "flex", flexAlign: "row" }}
                              key={comment.id}
                            >
                              <Votes commentId={comment.id} />
                              <Comment style={{ marginLeft: "15px" }}>
                                <Comment.Content>
                                  <Comment.Author as="a">
                                    {comment.author}
                                  </Comment.Author>
                                  <Comment.Metadata>
                                    posted {moment(comment.timestamp).fromNow()}
                                  </Comment.Metadata>
                                  <Comment.Text>{comment.body}</Comment.Text>
                                  <Comment.Actions>
                                    <Comment.Action>Edit</Comment.Action>
                                  </Comment.Actions>
                                </Comment.Content>
                              </Comment>
                            </div>
                          );
                        })}
                      </Comment.Group>
                    )}
                  </Comment>
                </Comment.Group>
              )}
              {this.state.editing && <PostForm postId={post.id} />}
            </div>
          )}
        </Container>
      </Segment>
    );
  }
}

export default connect(state => state, {
  getPostById,
  getCommentsByPostId,
  setCommentSort
})(Post);
