import { authActionTypes } from "./auth.actiontype";

export const actions = {
  setLoggedInSuccess: (data) => ({
    type: authActionTypes.SET_LOGGED_IN_SUCCESS,
    data,
  }),
};
