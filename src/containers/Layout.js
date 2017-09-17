import React, { Component } from "react";
import { connect } from "react-redux";
import { Post, Posts, Navigation } from "../components";

class Layout extends Component {
  render() {
    const { post_id, category } = this.props.match.params;
    return (
      <div>
        <Navigation />
        {post_id ? (
          <Post postId={post_id} />
        ) : (
          <Posts category={category || "all"} />
        )}
      </div>
    );
  }
}

export default connect(state => state)(Layout);
