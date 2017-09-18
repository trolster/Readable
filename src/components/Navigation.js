import React, { Component } from "react";
import { connect } from "react-redux";

class Navigation extends Component {
  render() {
    return (
      <ul className="nav">
        <li key="all">
          <a href="/">All Posts</a>
        </li>
        {this.props.categories.map(category => {
          return (
            <li key={category.name}>
              <a
                href={`/${category.path}`}
                className={category.name === this.props.category && "active"}
              >
                {category.name}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default connect(state => state)(Navigation);
