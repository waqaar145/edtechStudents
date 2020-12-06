import { authActionTypes } from "./auth.actiontype";

const initalState = {
  first_name: "test",
  users: [],
};

export const Auth = (state = initalState, action = {}) => {
  switch (action.type) {
    case "FIRST_NAME_HANDLER":
      const { name, value } = action.data;
      return {
        ...state,
        [name]: value,
      };

    case "SET_USERS":
      return {
        ...state,
        users: action.data,
      };

    default:
      return state;
  }
};
