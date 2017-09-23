import omit from "lodash.omit";
import * as constants from "../actions/constants";

// Gives the comments.items property a shape of:
// items: {
//   [commentId]: { ...commentObject }
// }
const shapeCommentData = comments => {
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
    case constants.GET_COMMENTS_BY_POST_ID:
      return { ...state, items: shapeCommentData(action.payload) };
    case constants.GET_COMMENTS_BY_POST_ID_LIST:
      return {
        ...state,
        items: action.payload.reduce((acc, comments) => {
          return { ...acc, ...shapeCommentData(comments) };
        }, {})
      };
    case constants.VOTE_ON_COMMENT:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    case constants.CREATE_COMMENT:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    case constants.EDIT_COMMENT:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    case constants.DELETE_COMMENT:
      return { ...state, items: omit(state.items, action.payload.id) };
    case constants.SET_COMMENT_SORT:
      return {
        ...state,
        sortby: action.payload
      };
    default:
      return state;
  }
};
