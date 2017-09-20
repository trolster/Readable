import React, { Component } from "react";
import { connect } from "react-redux";
import sortBy from "lodash.sortby";
import startCase from "lodash.startcase";
import moment from "moment";
import { getPostsByCategory, setPostSort } from "../actions/posts";
import { getCommentsByPostIdList } from "../actions/comments";
import { Link } from "react-router-dom";
import { Segment, Container, Header, Comment, Icon } from "semantic-ui-react";
import Votes from "./Votes";
import Sort from "./Sort";
import PostForm from "./PostForm";

class Posts extends Component {
  componentDidMount() {
    this.props.getPostsByCategory(this.props.category).then(postIds => {
      this.props.getCommentsByPostIdList(postIds);
    });
  }
  render() {
    const { items, sortby } = this.props.posts;
    const posts = sortBy(Object.values(items), sortby).reverse();
    const comments = Object.values(this.props.comments.items);
    return (
      <Segment basic>
        <Container text>
          <Header as="h3">{startCase(this.props.category)} Posts</Header>
          <PostForm />
          {posts.length > 1 && <Sort itemType="posts" />}
          <Comment.Group>
            {posts.map(post => {
              const commentCount = comments.filter(
                comment => comment.parentId === post.id
              ).length;
              const { author, timestamp, body, title, id, category } = post;

              return (
                <div style={{ display: "flex", flexAlign: "row" }} key={id}>
                  <Votes postId={post.id} />
                  <Comment style={{ marginLeft: "15px" }}>
                    <Comment.Avatar src="http://via.placeholder.com/35" />
                    <Comment.Content>
                      <Comment.Author>
                        {author}
                        <Comment.Metadata>
                          posted {moment(timestamp).fromNow()}
                        </Comment.Metadata>
                      </Comment.Author>
                      <Comment.Metadata
                        style={{ display: "block", margin: ".33em 0" }}
                      >
                        <Icon
                          name="comment outline"
                          style={{ margin: "0 4px -4px 0" }}
                        />
                        {commentCount} Comments
                      </Comment.Metadata>
                      <Link to={`/${category}/${id}`}>
                        <Header as="h3" style={{ margin: ".33em 0" }}>
                          {title}
                        </Header>
                        <Comment.Text>{body.substring(0, 120)}...</Comment.Text>
                      </Link>
                    </Comment.Content>
                  </Comment>
                </div>
              );
            })}
          </Comment.Group>
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
