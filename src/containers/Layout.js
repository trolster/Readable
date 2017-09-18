import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../actions/categories";
import { Post, Posts, Navigation } from "../components";

class Layout extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    const { post_id, category } = this.props.match.params;
    return (
      <div>
        <Navigation category={category || "all"} />
        {post_id ? (
          <Post postId={post_id} />
        ) : (
          <Posts category={category || "all"} />
        )}
      </div>
    );
  }
}

export default connect(state => state, { getCategories })(Layout);
