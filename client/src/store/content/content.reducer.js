import {contentActionTypes} from './content.actiontype';

const initalState = {
  contents: []
}

export const Content  = (state = initalState, action = {}) => {
  switch(action.type){

    case contentActionTypes.GET_CONTENT:
      return {
        ...state,
        contents: action.data
      }

    default:
      return state;
  }
}