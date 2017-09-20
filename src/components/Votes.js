import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import { voteOnPost } from "../actions/posts";
import { voteOnComment } from "../actions/comments";

class Votes extends Component {
  itemType = this.props.postId ? "posts" : "comments";
  id = this.props.postId || this.props.commentId;
  handleVote(voteType) {
    if (this.props.postId) {
      this.props.voteOnPost(voteType, this.props.postId);
    } else {
      this.props.voteOnComment(voteType, this.props.commentId);
    }
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "30px",
          marginTop: "16px"
        }}
      >
        <div>
          <Icon
            onClick={() => this.handleVote("upVote")}
            name="up arrow"
            style={{ marginRight: 0, cursor: "pointer" }}
          />
        </div>
        <div>{this.props[this.itemType].items[this.id].voteScore}</div>
        <div>
          <Icon
            onClick={() => this.handleVote("downVote")}
            name="down arrow"
            style={{ marginRight: 0, cursor: "pointer" }}
          />
        </div>
      </div>
    );
  }
}

export default connect(state => state, { voteOnPost, voteOnComment })(Votes);
