// API utility functions
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Readable"
};
const API_ROOT = "http://localhost:3001";

const callApi = (url, options) => {
  return fetch(url, options).then(res =>
    res.json().then(json => {
      if (!res.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

// API requests
export const fetchCategories = () => {
  return callApi(`${API_ROOT}/categories`, { headers });
};

export const fetchPostsByCategory = category => {
  const path = category === "all" ? "posts" : `${category}/posts`;
  return callApi(`${API_ROOT}/${path}`, { headers });
};

export const fetchCommentsByPost = postId => {
  return callApi(`${API_ROOT}/posts/${postId}/comments`, { headers });
};
