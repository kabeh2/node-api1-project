import * as actionTypes from "./actionTypes";

export const fetchRequest = () => ({
  type: actionTypes.FETCH_REQUEST
});

export const fetchSuccess = payload => ({
  type: actionTypes.FETCH_SUCCESS,
  payload
});

export const fetchUpdate = users => ({
  type: actionTypes.FETCH_UPDATE,
  payload: users
});

export const fetchError = error => ({
  type: actionTypes.FETCH_ERROR,
  payload: error
});

export const getRequest = payload => ({
  type: actionTypes.GET_REQUEST,
  payload
});

export const deleteUser = (id, users) => ({
  type: actionTypes.DELETE_REQUEST,
  payload: {
    id,
    users
  }
});

export const addUser = values => ({
  type: actionTypes.ADD_USER,
  payload: values
});

export const updateUser = (values, id) => ({
  type: actionTypes.UPDATE_USER,
  payload: {
    values,
    id
  }
});
