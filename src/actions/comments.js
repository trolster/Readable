import {
  GET_COMMENTS_BY_POST_ID,
  GET_COMMENTS_BY_POST_ID_LIST
} from "./constants";
import { fetchCommentsByPost } from "../api";

export const getCommentsByPostId = postId => async dispatch => {
  const response = await fetchCommentsByPost(postId);
  dispatch({
    type: GET_COMMENTS_BY_POST_ID,
    payload: response
  });
  return true;
};

export const getCommentsByPostIdList = postIds => async dispatch => {
  const allComments = await Promise.all(
    postIds.map(id => {
      return fetchCommentsByPost(id);
    })
  );
  dispatch({
    type: GET_COMMENTS_BY_POST_ID_LIST,
    payload: allComments
  });
};
