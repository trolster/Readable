import {
  GET_COMMENTS_BY_POST_ID,
  GET_COMMENTS_BY_POST_ID_LIST,
  VOTE_ON_COMMENT
} from "../actions/constants";

// Gives the comments.items property a shape of:
// items: {
//   commentId: { ...commentObject }
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
    case VOTE_ON_COMMENT:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    default:
      return state;
  }
};
