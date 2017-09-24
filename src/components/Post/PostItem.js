import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import sortBy from "lodash.sortby";
import { Comment, Header } from "semantic-ui-react";
import { deletePost } from "../../actions";
import { CommentItem, PostForm, Votes, Sort, DateFromTimestamp } from "../";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      redirect: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditingStateChange = this.handleEditingStateChange.bind(this);
  }

  handleEditingStateChange(e) {
    e.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  handleDelete() {
    this.setState({ redirect: true, deleted: true });
    this.props.deletePost(this.props.postId).catch(error => {
      console.log(error);
    });
  }

  render() {
    if (this.state.deleted) {
      return <Redirect to="/" />;
    }
    const post = this.props.posts.items[this.props.postId];
    const { items, sortby } = this.props.comments;
    const comments = sortBy(
      // Start by filtering out the comments that aren't for this post.
      Object.values(items).filter(comment => comment.parentId === post.id),
      sortby
    ).reverse();
    return (
      <div style={{ display: "flex", flexAlign: "row" }} key={post.id}>
        <Votes postId={post.id} />
        <Comment.Group>
          <Comment style={{ marginLeft: "15px" }}>
            <Comment.Avatar src="http://via.placeholder.com/35" />
            {!this.state.editing && (
              <Comment.Content>
                <Comment.Author>
                  {post.author}
                  <Comment.Metadata>
                    <DateFromTimestamp timestamp={post.timestamp} />
                  </Comment.Metadata>
                </Comment.Author>
                <Header as="h3" style={{ margin: ".33em 0" }}>
                  {post.title}
                </Header>
                <Comment.Text>{post.body}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action onClick={this.handleEditingStateChange}>
                    Edit
                  </Comment.Action>
                  <Comment.Action onClick={this.handleDelete}>
                    Delete
                  </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            )}
            {this.state.editing && (
              <Comment.Content>
                <PostForm
                  className="post-form"
                  postId={post.id}
                  handleEditingStateChange={this.handleEditingStateChange}
                />
              </Comment.Content>
            )}
            {comments && (
              <Comment.Group>
                {comments.length > 1 && (
                  <div>
                    <Sort itemType="comments" />
                    <Header as="h3" dividing className="comment-header">
                      Comments
                    </Header>
                  </div>
                )}
                {comments.map(comment => {
                  return (
                    <CommentItem key={comment.id} commentId={comment.id} />
                  );
                })}
              </Comment.Group>
            )}
          </Comment>
        </Comment.Group>
      </div>
    );
  }
}

export default connect(state => state, {
  deletePost
})(Post);
