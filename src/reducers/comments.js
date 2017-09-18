import {
  GET_COMMENTS_BY_POST_ID,
  GET_COMMENTS_BY_POST_ID_LIST
} from "../actions/constants";

// Gives the comments.items property a shap of:
// items: {
//   commentId: comment
// }
const normalizeComments = comments => {
  return comments.reduce((acc, comment) => {
    return { ...acc, [comment.id]: comment };
  }, {});
};

export default (
  state = {
    defaultSort: "timestamp",
    items: {}
  },
  action
) => {
  switch (action.type) {
    case GET_COMMENTS_BY_POST_ID:
      return { ...state, items: normalizeComments(action.payload) };
    case GET_COMMENTS_BY_POST_ID_LIST:
      return {
        ...state,
        items: action.payload.reduce((acc, comments) => {
          return { ...acc, ...normalizeComments(comments) };
        }, {})
      };
    default:
      return state;
  }
};
