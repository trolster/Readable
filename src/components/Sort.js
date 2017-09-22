import React, { Component } from "react";
import { connect } from "react-redux";
import { setCommentSort } from "../actions/comments";
import { setPostSort } from "../actions/posts";
import { Form, Select } from "semantic-ui-react";

const sortOptions = [
  { key: "timestamp", text: "Most Recent", value: "timestamp" },
  { key: "voteScore", text: "Most Popular", value: "voteScore" }
];

class Sort extends Component {
  handleSort = (e, { value }) => {
    if (this.props.itemType === "comments") {
      this.props.setCommentSort(value);
    } else {
      this.props.setPostSort(value);
    }
  };
  render() {
    return (
      <Form style={{ margin: "15px 0 0 0" }} size="mini">
        <Form.Field
          control={Select}
          options={sortOptions}
          placeholder="Select sort order..."
          onChange={this.handleSort}
          width="1"
        />
      </Form>
    );
  }
}

export default connect(state => state, { setPostSort, setCommentSort })(Sort);