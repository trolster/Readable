import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Comment, Header, Icon } from "semantic-ui-react";
import { deletePost } from "../actions";
import Votes from "./Votes";
import DateFromTimestamp from "./DateFromTimestamp";

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
      <div style={{ display: "flex", flexAlign: "row" }} key={post.id}>
        <Votes postId={post.id} />
        <Comment.Group>
          <Comment style={{ marginLeft: "15px" }}>
            <Comment.Avatar src="http://via.placeholder.com/35" />
            <Comment.Content>
              <Comment.Author>
                {post.author}
                <Comment.Metadata>
                  <DateFromTimestamp timestamp={post.timestamp} />
                </Comment.Metadata>
              </Comment.Author>
              <Comment.Metadata style={{ display: "block", margin: ".33em 0" }}>
                <Icon
                  name="comment outline"
                  style={{ margin: "0 4px -4px 0" }}
                />
                {commentCount} Comments
              </Comment.Metadata>
              <Link to={`/${post.category}/${post.id}`}>
                <Header as="h3" style={{ margin: ".33em 0" }}>
                  {post.title}
                </Header>
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
