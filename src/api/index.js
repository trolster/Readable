// API utility functions
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Readable"
};
const API_ROOT = "http://localhost:3001";

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

// API requests
export const saveVoteScore = (itemType, voteType, id) => {
  return callApi(`${itemType}/${id}`, {
    headers,
    method: "POST",
    body: JSON.stringify({ option: voteType })
  });
};

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
