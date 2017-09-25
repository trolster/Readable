import omit from "lodash.omit";
import * as constants from "../actions/constants";

// Gives the comments.items property a shape of:
// items: {
//   [postId]: { ...postObject }
// }
const shapePostData = posts => {
  return posts.reduce((acc, post) => ({ ...acc, [post.id]: post }), {});
};

export default (
  state = {
    sortby: "voteScore",
    items: {}
  },
  action
) => {
  switch (action.type) {
    case constants.GET_POSTS_BY_CATEGORY:
      return {
        ...state,
        items: shapePostData(action.payload)
      };
    case constants.GET_POST_BY_ID:
      if (Object.keys(action.payload).length === 0) {
        return {
          ...state,
          items: null
        };
      }
      return {
        ...state,
        items: shapePostData([action.payload])
      };
    case constants.VOTE_ON_POST:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    case constants.EDIT_POST:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    case constants.CREATE_POST:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    case constants.DELETE_POST:
      return { ...state, items: omit(state.items, action.payload.id) };
    case constants.SET_POST_SORT:
      return {
        ...state,
        sortby: action.payload
      };
    default:
      return state;
  }
};
