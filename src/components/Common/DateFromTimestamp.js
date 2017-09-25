import React from "react";
import moment from "moment";
import { Comment } from "semantic-ui-react";

export default props => (
  <Comment.Metadata>{moment(props.timestamp).calendar()}</Comment.Metadata>
);
