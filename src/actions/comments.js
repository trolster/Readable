import {
  GET_COMMENTS_BY_POST_ID,
  GET_COMMENTS_BY_POST_ID_LIST,
  VOTE_ON_COMMENT
} from "./constants";
import { fetchCommentsByPost, saveVoteScore } from "../api";

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
