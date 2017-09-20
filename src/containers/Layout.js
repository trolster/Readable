import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../actions/categories";
import { Post, Posts, Navigation } from "../components";

class Layout extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    const { post_id, category = "all" } = this.props.match.params;
    return (
      <div>
        <Navigation category={category} />
        {post_id ? <Post postId={post_id} /> : <Posts category={category} />}
      </div>
    );
  }
}

export default connect(state => state, { getCategories })(Layout);
