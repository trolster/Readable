import React from "react";
import moment from "moment";

export default props => <span>posted {moment(props.timestamp).fromNow()}</span>;
