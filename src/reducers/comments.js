import omit from "lodash.omit";
import {
  GET_COMMENTS_BY_POST_ID,
  GET_COMMENTS_BY_POST_ID_LIST,
  SET_COMMENT_SORT,
  VOTE_ON_COMMENT,
  EDIT_COMMENT,
  CREATE_COMMENT,
  DELETE_COMMENT
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
    sortby: "voteScore",
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
    case SET_COMMENT_SORT:
      return {
        ...state,
        sortby: action.payload
      };
    case VOTE_ON_COMMENT:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    case EDIT_COMMENT:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    case CREATE_COMMENT:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    case DELETE_COMMENT:
      return { ...state, items: omit(state.items, action.payload.id) };
    default:
      return state;
  }
};
