import * as actionTypes from "../actions/actionTypes";

const initialState = {
  fetch: false,
  data: [],
  error: "",
  update: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REQUEST:
      return {
        ...state,
        fetch: true,
        update: {}
      };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        fetch: false,
        data: action.payload,
        error: ""
      };
    case actionTypes.FETCH_UPDATE:
      return {
        ...state,
        fetch: false,
        error: "",
        update: action.payload
      };
    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        fetch: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
