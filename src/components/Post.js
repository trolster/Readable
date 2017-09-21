import React, { Component } from "react";
import { connect } from "react-redux";
import sortBy from "lodash.sortby";
import moment from "moment";
import { Segment, Container, Comment, Header, Button } from "semantic-ui-react";
import { getPostById } from "../actions/posts";
import { getCommentsByPostId, setCommentSort } from "../actions/comments";
import Votes from "./Votes";
import Sort from "./Sort";
import PostForm from "./PostForm";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.handleEditingStateChange = this.handleEditingStateChange.bind(this);
  }
  handleEditingStateChange(e) {
    e.preventDefault();
    this.setState({ editing: !this.state.editing });
  }
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
          {post &&
            (!this.state.editing && (
              <div style={{ display: "flex", flexAlign: "row" }} key={post.id}>
                <Votes postId={post.id} />
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
                      <Comment.Actions>
                        {!this.state.editing && (
                          <Comment.Action
                            onClick={this.handleEditingStateChange}
                          >
                            <Button basic content="Edit" />
                          </Comment.Action>
                        )}
                      </Comment.Actions>
                    </Comment.Content>
                    {comments && (
                      <Comment.Group>
                        {comments.length > 1 && <Sort itemType="comments" />}
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
              </div>
            ))}
          {this.state.editing && (
            <PostForm
              postId={post.id}
              handleEditingStateChange={this.handleEditingStateChange}
            />
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
