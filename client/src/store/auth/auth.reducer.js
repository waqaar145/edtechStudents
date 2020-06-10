import {authActionTypes} from './auth.actiontype';

const initalState = {
  uid: null,
  uuid: '',
  first_name: '',
  last_name: '',
  username: '',
  email: ''
}

export const Auth  = (state = initalState, action = {}) => {
  switch(action.type){

    case authActionTypes.LOGGED_IN_USER:
      return {
        ...state,
        ...action.data
      }

    default:
      return state;
  }
}