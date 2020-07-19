import {builderActionTypes} from './builder.actiontype';

const initalState = {
  subjectLayoutBuilder: {
    discussion: {
      loading: false,
      on: false,
      current_topic: {}
    }
  }
}

export const Builder  = (state = initalState, action = {}) => {
  switch(action.type){

    case builderActionTypes.START_DISCUSSION:
      return {
        ...state,
        subjectLayoutBuilder: {
          ...state.subjectLayoutBuilder,
          discussion: {
            ...state.subjectLayoutBuilder.discussion,
            on: true,
            current_topic: action.data
          }
        }
      }
    
    case builderActionTypes.STOP_DISCUSSION:
      return {
        ...state,
        subjectLayoutBuilder: {
          discussion: {
            ...state.subjectLayoutBuilder.discussion,
            loading: false,
            on: false,
            current_topic: {}
          }
        }
      }

    default:
      return state;
  }
}