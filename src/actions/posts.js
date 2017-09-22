import uuid from "uuid/v4";
import {
  GET_POSTS_BY_CATEGORY,
  GET_POST_BY_ID,
  SET_POST_SORT,
  VOTE_ON_POST,
  EDIT_POST,
  CREATE_POST,
  DELETE_POST
} from "./constants";
import {
  fetchPostsByCategory,
  fetchPostById,
  saveVoteScore,
  saveEditedPost,
  saveNewPost,
  removePost
} from "../api";

export const deletePost = postId => async dispatch => {
  const response = await removePost(postId);
  dispatch({
    type: DELETE_POST,
    payload: response
  });
  return response;
};

export const createNewPost = post => async dispatch => {
  const response = await saveNewPost({
    ...post,
    id: uuid(),
    timestamp: Date.now()
  });
  dispatch({
    type: CREATE_POST,
    payload: response
  });
};

export const editPost = post => async dispatch => {
  const response = await saveEditedPost(post);
  dispatch({
    type: EDIT_POST,
    payload: response
  });
  return post.id;
};

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
  return response;
};

export const setPostSort = sort => ({
  type: SET_POST_SORT,
  payload: sort
});
