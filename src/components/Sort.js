import React, { Component } from "react";
import { connect } from "react-redux";
import { setCommentSort, setPostSort } from "../actions";
import { Form } from "semantic-ui-react";

const sortOptions = [
  { key: "voteScore", text: "Most Popular", value: "voteScore" },
  { key: "timestamp", text: "Most Recent", value: "timestamp" }
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
      <Form style={{ textAlign: "right" }} size="mini">
        <Form.Select
          inline
          options={sortOptions}
          value={this.props[this.props.itemType].sortby}
          label="Sorted by "
          onChange={this.handleSort}
        />
      </Form>
    );
  }
}

export default connect(state => state, { setPostSort, setCommentSort })(Sort);
