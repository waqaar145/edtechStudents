import {contentBuilderActionTypes} from './contentBuilder.actiontype';

const initalState = {
  subjectLayoutBuilder: {
    discussion: {
      loading: false,
      on: false,
      current_topic: {}
    }
  }
}

export const ContentBuilder  = (state = initalState, action = {}) => {
  switch(action.type){

    case contentBuilderActionTypes.REQUEST:
      return {
        ...state,
        subjectLayoutBuilder: {
          ...state.subjectLayoutBuilder,
          discussion: {
            ...state.subjectLayoutBuilder.discussion,
            loading: true
          }
        }
      }

    case contentBuilderActionTypes.COMPLETE:
      return {
        ...state,
        subjectLayoutBuilder: {
          ...state.subjectLayoutBuilder,
          discussion: {
            ...state.subjectLayoutBuilder.discussion,
            loading: false
          }
        }
      }

    case contentBuilderActionTypes.START_DISCUSSION:
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
    
    case contentBuilderActionTypes.STOP_DISCUSSION:
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