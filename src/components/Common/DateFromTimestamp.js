import React from "react";
import moment from "moment";

export default props => <span>{moment(props.timestamp).calendar()}</span>;
