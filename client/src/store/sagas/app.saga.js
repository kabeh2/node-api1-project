import { all, takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { fetchRequest, fetchSuccess, fetchError } from "../actions/index";
import * as actionTypes from "../actions/actionTypes";
import { apiEndpoint } from "../../services/authService";

async function fetchData(id) {
  const { data } = await axios.get(`${apiEndpoint}/${id ? id : ""}`);
  return data;
}

export function* tryGetRequest(action) {
  try {
    yield put(fetchRequest());
    const data = yield call(fetchData, action.payload);

    const id = action.payload;
    let dataArray;

    if (id) {
      dataArray = [data];
    } else {
      dataArray = [...data];
    }

    yield put(fetchSuccess(dataArray));
  } catch (error) {
    yield put(fetchError(error.message));
  }
}

export function* onGetRequest() {
  yield takeLatest(actionTypes.GET_REQUEST, tryGetRequest);
}

async function fetchDelete(id) {
  return await axios.delete(`${apiEndpoint}/${id}`);
}

export function* tryDeleteRequest(action) {
  yield put(fetchRequest());

  const usersCopy = [...action.payload.users];

  const updatedUsers = [...action.payload.users].filter(
    user => user.id !== action.payload.id
  );

  yield put(fetchSuccess(updatedUsers));
  try {
    console.log("DELETE: ", action);
    yield call(fetchDelete, action.payload.id);
  } catch (error) {
    console.log(error);
    yield put(fetchSuccess(usersCopy));
    yield put(fetchError(error.message));
  }
}

export function* onDelete() {
  yield takeLatest(actionTypes.DELETE_REQUEST, tryDeleteRequest);
}

async function fetchAdd(values) {
  return await axios.post(`${apiEndpoint}`, values);
}

export function* tryAddUser(action) {
  yield put(fetchRequest());

  try {
    yield call(fetchAdd, action.payload);
    console.log("USER ADDED...");
  } catch (error) {
    console.log("ADD USER ERROR: ", error.message);
    yield put(fetchError(error.message));
  }
}

export function* onAddUser() {
  yield takeLatest(actionTypes.ADD_USER, tryAddUser);
}

const fetchUpdate = async ({ values, id }) => {
  return await axios.put(`${apiEndpoint}${id}`, values);
};

export function* tryUpdateUser(action) {
  yield put(fetchRequest());

  try {
    yield call(fetchUpdate, {
      values: action.payload.values,
      id: action.payload.id
    });
  } catch (error) {
    console.log("UPDATE USER ERROR: ", error.message);
    yield put(fetchError(error.message));
  }
}

export function* onUpdateUser() {
  yield takeLatest(actionTypes.UPDATE_USER, tryUpdateUser);
}

export function* appSagas() {
  yield all([
    call(onGetRequest),
    call(onDelete),
    call(onAddUser),
    call(onUpdateUser)
  ]);
}
