import uuid from "uuid/v4";
import {
  GET_COMMENTS_BY_POST_ID,
  GET_COMMENTS_BY_POST_ID_LIST,
  SET_COMMENT_SORT,
  VOTE_ON_COMMENT,
  EDIT_COMMENT,
  CREATE_COMMENT,
  DELETE_COMMENT
} from "./constants";
import {
  fetchCommentsByPost,
  saveVoteScore,
  saveEditedComment,
  saveNewComment,
  removeComment
} from "../api";

export const setCommentSort = sort => ({
  type: SET_COMMENT_SORT,
  payload: sort
});

export const deleteComment = commentId => async dispatch => {
  const response = await removeComment(commentId);
  dispatch({
    type: DELETE_COMMENT,
    payload: response
  });
};

export const createComment = comment => async dispatch => {
  const response = await saveNewComment({
    ...comment,
    id: uuid(),
    timestamp: Date.now()
  });
  dispatch({
    type: CREATE_COMMENT,
    payload: response
  });
};

export const editComment = comment => async dispatch => {
  const response = await saveEditedComment(comment);
  dispatch({
    type: EDIT_COMMENT,
    payload: response
  });
};

export const voteOnComment = (voteType, id) => async dispatch => {
  const response = await saveVoteScore("comments", voteType, id);
  dispatch({
    type: VOTE_ON_COMMENT,
    payload: response
  });
};

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
