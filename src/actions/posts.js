import {
  GET_POSTS_BY_CATEGORY,
  GET_POST_BY_ID,
  VOTE_ON_POST
} from "./constants";
import { fetchPostsByCategory, fetchPostById, saveVoteScore } from "../api";

export const voteOnPost = (voteType, id) => async dispatch => {
  const response = await saveVoteScore("posts", voteType, id);
  dispatch({
    type: VOTE_ON_POST,
    payload: response
  });
};

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

export const getPostById = postId => async dispatch => {
  const response = await fetchPostById(postId);
  dispatch({
    type: GET_POST_BY_ID,
    payload: response
  });
  return postId;
};