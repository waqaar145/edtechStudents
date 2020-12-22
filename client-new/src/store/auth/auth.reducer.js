import { authActionTypes } from "./auth.actiontype";

const initalState = {
  loggedInStatus: false,
  loggedInUser: {
    uid: null,
    uuid: "",
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  },
};

export const Auth = (state = initalState, action = {}) => {
  switch (action.type) {
    case authActionTypes.SET_LOGGED_IN_SUCCESS:
      return {
        ...state,
        loggedInStatus: true,
        loggedInUser: {
          ...state.loggedInUser,
          ...action.data,
        },
      };

    case authActionTypes.SET_LOGGED_IN_FAILED:
      return {
        ...state,
        loggedInStatus: false,
        loggedInUser: {
          ...state.loggedInUser,
          uid: null,
          uuid: "",
          username: "",
          first_name: "",
          last_name: "",
          email: "",
        },
      };

    default:
      return state;
  }
};
