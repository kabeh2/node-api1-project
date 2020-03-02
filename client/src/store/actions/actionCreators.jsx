import * as actionTypes from "./actionTypes";
import axios from "axios";
import { apiEndpoint } from "../../services/authService";

export const fetchRequest = () => ({
  type: actionTypes.FETCH_REQUEST
});

export const fetchSuccess = payload => ({
  type: actionTypes.FETCH_SUCCESS,
  payload
});

export const fetchError = error => ({
  type: actionTypes.FETCH_ERROR,
  payload: error
});

export const getRequest = id => {
  return async dispatch => {
    await dispatch(fetchRequest());

    try {
      let dataArray;
      const { data } = await axios.get(`${apiEndpoint}/${id ? id : ""}`);
      if (id) {
        dataArray = [data];
      } else {
        dataArray = [...data];
      }

      await dispatch(fetchSuccess(dataArray));
    } catch (error) {
      console.log(error.message);
      await dispatch(fetchError(error.message));
    }
  };
};

export const deleteUser = (id, users) => {
  return async dispatch => {
    await dispatch(fetchRequest());

    // make copy of all users
    const usersCopy = [...users];

    // filter out specific user
    const updatedUsers = [...users].filter(user => user.id !== id);

    // update the new state with filtered out user
    await dispatch(fetchSuccess(updatedUsers));

    // trycatch and delete user from server
    try {
      await axios.delete(`${apiEndpoint}/${id}`);
    } catch (error) {
      console.log(error.message);
      await dispatch(fetchSuccess(usersCopy));
      await dispatch(fetchError(error.message));
    }
  };
};

export const addUser = values => {
  return async dispatch => {
    await dispatch(fetchRequest());

    try {
      await axios.post(`${apiEndpoint}`, values);
    } catch (error) {
      console.log("Error: ", error.message);
      await dispatch(fetchError(error.message));
    }
  };
};

export const fetchUpdate = users => ({
  type: actionTypes.FETCH_UPDATE,
  payload: users
});

export const updateUser = (values, id, users) => {
  return async dispatch => {
    await dispatch(fetchRequest());

    try {
      await axios.put(`${apiEndpoint}${id}`, values);
    } catch (error) {
      console.log("Error: ", error.message);
      await dispatch(fetchError(error.message));
    }
  };
};
