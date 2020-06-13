import {authActionTypes} from './auth.actiontype';

export const actions = {
  setAuthUser: (data) => ({type: authActionTypes.LOGGED_IN_USER, data}),
  setLogout: () => ({type: authActionTypes.LOGOUT})
};