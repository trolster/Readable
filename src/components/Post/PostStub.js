import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Comment, Header, Icon } from "semantic-ui-react";
import { deletePost } from "../../actions";
import { Votes, DateFromTimestamp } from "../";

class PostStub extends Component {
  state = {
    editing: false,
    redirect: false
  };

  render() {
    const post = this.props.posts.items[this.props.postId];
    const comments = Object.values(this.props.comments.items);
    const commentCount = comments.filter(
      comment => comment.parentId === post.id
    ).length;
    return (
      <div className="post-list-item" key={post.id}>
        <Votes postId={post.id} />
        <Comment.Group>
          <Comment>
            <Comment.Avatar src="http://via.placeholder.com/35" />
            <Comment.Content>
              <Comment.Author>
                {post.author}
                <Comment.Metadata>
                  <DateFromTimestamp timestamp={post.timestamp} />
                </Comment.Metadata>
              </Comment.Author>
              <Comment.Metadata className="comment-count">
                <Icon name="comment outline" />
                {commentCount} Comments
              </Comment.Metadata>
              <Link to={`/${post.category}/${post.id}`}>
                <Header as="h2">{post.title}</Header>
              </Link>
              <Comment.Text>{post.body.substring(0, 120)}...</Comment.Text>
              <Comment.Actions>
                <Comment.Action href={`/${post.category}/${post.id}`}>
                  Read More...
                </Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </div>
    );
  }
}

export default connect(state => state, {
  deletePost
})(PostStub);
