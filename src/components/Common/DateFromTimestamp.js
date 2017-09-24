import React from "react";
import moment from "moment";

export default props => (
  <span>Posted {moment(props.timestamp).calendar()}</span>
);
