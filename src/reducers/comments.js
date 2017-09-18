import {
  GET_COMMENTS_BY_POST,
  GET_COMMENTS_BY_POST_ID_LIST
} from "../actions/constants";

export default (
  state = {
    defaultSort: "timestamp",
    items: {}
  },
  action
) => {
  switch (action.type) {
    case GET_COMMENTS_BY_POST:
      return { ...state, ...action.payload };
    case GET_COMMENTS_BY_POST_ID_LIST:
      return {
        ...state,
        items: action.payload.reduce((acc, comments) => {
          const normalizedComments = comments.reduce((acc, comment) => {
            return { ...acc, [comment.id]: comment };
          }, {});
          return { ...acc, ...normalizedComments };
        }, {})
      };
    default:
      return state;
  }
};
