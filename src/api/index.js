// API utility functions

const API_ROOT = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Readable"
};

// Common function for calling the API
const callApi = (url, options) => {
  return fetch(`${API_ROOT}/${url}`, options).then(res =>
    res.json().then(json => {
      if (!res.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

// Get categories, posts and comments
export const fetchCategories = () => {
  return callApi("categories", { headers });
};

export const fetchPostById = postId => {
  return callApi(`posts/${postId}`, { headers });
};

export const fetchPostsByCategory = category => {
  const path = category === "all" ? "posts" : `${category}/posts`;
  return callApi(path, { headers });
};

export const fetchCommentsByPost = postId => {
  return callApi(`posts/${postId}/comments`, { headers });
};

// Vote on posts and comments
export const saveVoteScore = (itemType, voteType, id) => {
  return callApi(`${itemType}/${id}`, {
    headers,
    method: "POST",
    body: JSON.stringify({ option: voteType })
  });
};

// Create posts and comments
export const saveNewPost = post => {
  return callApi("posts", {
    headers,
    method: "POST",
    body: JSON.stringify({ ...post })
  });
};

export const saveNewComment = comment => {
  return callApi("comments", {
    headers,
    method: "POST",
    body: JSON.stringify({ ...comment })
  });
};

// Edit posts and comments
export const saveEditedPost = post => {
  const { id, title, body } = post;
  return callApi(`posts/${id}`, {
    headers,
    method: "PUT",
    body: JSON.stringify({ title, body })
  });
};

export const saveEditedComment = comment => {
  const { id, body } = comment;
  return callApi(`comments/${id}`, {
    headers,
    method: "PUT",
    body: JSON.stringify({ body, timestamp: Date.now() })
  });
};

// Delete posts and comments
export const removePost = postId => {
  return callApi(`posts/${postId}`, {
    headers,
    method: "DELETE"
  });
};

export const removeComment = commentId => {
  return callApi(`comments/${commentId}`, {
    headers,
    method: "DELETE"
  });
};
