import { GET_POSTS_BY_CATEGORY } from "../actions/constants";

export default (
  state = {
    defaultSort: "timestamp"
  },
  action
) => {
  switch (action.type) {
    case GET_POSTS_BY_CATEGORY:
      return {
        ...state,
        ...action.payload.reduce(
          (acc, post) => ({ ...acc, [post.id]: post }),
          {}
        )
      };
    default:
      return state;
  }
};
