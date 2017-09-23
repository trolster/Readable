import * as constants from "../actions/constants";

export default (state = [], action) => {
  switch (action.type) {
    case constants.GET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};
