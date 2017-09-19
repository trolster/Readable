import React, { Component } from "react";
import { connect } from "react-redux";
import { voteOnPost } from "../actions/posts";

class Votes extends Component {
  itemType = this.props.postId ? "posts" : "comments";
  id = this.props.postId || this.props.commentId;
  handleVote(voteType) {
    if (this.props.postId) {
      this.props.voteOnPost(voteType, this.props.postId);
    } else {
      console.log("voting on comment");
      // this.props.voteOnComment(voteType, this.props.commentId);
    }
  }
  render() {
    return (
      <div className="votes">
        <button onClick={() => this.handleVote("downVote")}> - </button>
        {this.props[this.itemType].items[this.id].voteScore}
        <button onClick={() => this.handleVote("upVote")}> + </button>
      </div>
    );
  }
}

export default connect(state => state, { voteOnPost })(Votes);
