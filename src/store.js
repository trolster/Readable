import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { categories, posts, comments } from "./reducers";

const reducer = combineReducers({
  categories,
  posts,
  comments
});

export default createStore(reducer, applyMiddleware(thunk));
