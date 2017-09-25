import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import sortBy from "lodash.sortby";
import { Link } from "react-router-dom";
import { Comment, Header, Icon } from "semantic-ui-react";
import { deletePost } from "../../actions";
import { CommentItem, PostForm, Votes, Sort } from "../";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      redirect: false,
      showComments: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditingStateChange = this.handleEditingStateChange.bind(this);
  }

  handleEditingStateChange(e) {
    e.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  handleDelete() {
    this.setState({ redirect: true });
    this.props.deletePost(this.props.postId);
  }

  render() {
    const post = this.props.posts.items[this.props.postId];
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    const comments = sortBy(
      Object.values(this.props.comments.items).filter(
        comment => comment.parentId === post.id
      ),
      this.props.comments.sortby
    ).reverse();
    return (
      <Comment.Group className="post-item">
        <Votes postId={post.id} />
        <Comment>
          <Comment.Avatar src="http://via.placeholder.com/35" />
          {!this.state.editing && (
            <Comment.Content>
              <Link to={`/${post.category}/${post.id}`}>
                <Header as="h2">{post.title}</Header>
              </Link>
              <Comment.Metadata className="post-metadata">
                <Comment.Author>By {post.author}</Comment.Author>
                <span>{moment(post.timestamp).calendar()}</span>
              </Comment.Metadata>
              <Comment.Metadata className="post-metadata">
                <Icon name="comment outline" />
                {comments.length} Comments
              </Comment.Metadata>
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
          {this.props.showComments && (
            <Comment.Group>
              {!!comments.length && (
                <header className="comment-list-header">
                  {comments.length > 1 && <Sort itemType="comments" />}
                  <Header as="h3" dividing className="comment-header">
                    Comments
                  </Header>
                </header>
              )}
              {comments.map(comment => {
                return <CommentItem key={comment.id} commentId={comment.id} />;
              })}
            </Comment.Group>
          )}
        </Comment>
      </Comment.Group>
    );
  }
}

export default connect(state => state, {
  deletePost
})(Post);
