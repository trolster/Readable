import { GET_POSTS_BY_CATEGORY, GET_POST_BY_ID } from "../actions/constants";

const normalizePosts = posts => {
  return posts.reduce((acc, post) => ({ ...acc, [post.id]: post }), {});
};

export default (
  state = {
    defaultSort: "timestamp",
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
    default:
      return state;
  }
};
