import { GET_POSTS_BY_CATEGORY } from "./constants";
import { fetchPostsByCategory } from "../api";

export const getPostsByCategory = category => async dispatch => {
  const response = await fetchPostsByCategory(category);
  dispatch({
    type: GET_POSTS_BY_CATEGORY,
    payload: response
  });
  // Returns the post ids, so that it's possible to chain a call to the API for
  // the comments for each post.
  return response.map(post => post.id);
};
