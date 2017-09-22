import { GET_CATEGORIES } from "./constants";
import { fetchCategories } from "../api";

export const getCategories = () => async dispatch => {
  const response = await fetchCategories();
  dispatch({
    type: GET_CATEGORIES,
    payload: response.categories
  });
  return response;
};
