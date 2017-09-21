import omit from "lodash.omit";
import {
  GET_POSTS_BY_CATEGORY,
  GET_POST_BY_ID,
  SET_POST_SORT,
  VOTE_ON_POST,
  EDIT_POST,
  CREATE_POST,
  DELETE_POST
} from "../actions/constants";

const normalizePosts = posts => {
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
    case GET_POSTS_BY_CATEGORY:
      return {
        ...state,
        items: normalizePosts(action.payload)
      };
    case GET_POST_BY_ID:
      return {
        ...state,
        items: normalizePosts([action.payload])
      };
    case SET_POST_SORT:
      return {
        ...state,
        sortby: action.payload
      };
    case VOTE_ON_POST:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    case EDIT_POST:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    case CREATE_POST:
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    case DELETE_POST:
      return { ...state, items: omit(state.items, action.payload.id) };
    default:
      return state;
  }
};
