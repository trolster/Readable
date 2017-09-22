import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCategories } from "../actions/categories";
import { Post, Posts, Navigation } from "../components";

class Layout extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.getCategories().then(({ categories }) => {
      if (category === undefined) {
        return;
      }
      // Check if the category from the URL exists, and redirect if it doesn't.
      const categoryExists = categories.map(c => c.name).includes(category);
      if (!categoryExists) {
        this.setState({ redirect: true });
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/404" error={this.state.error} />;
    }
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
