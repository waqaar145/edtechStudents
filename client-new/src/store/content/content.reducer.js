import {contentActionTypes} from './content.actiontype';

const initalState = {
  loading: false,
  subject: {
    id: null,
    subject_name: '',
    description: '',
    thumbnail: ''
  },
  current_chapters_stats: {
    total: '',
    theories: '',
    sums: ''
  },
  chapters: [],
  contents: [],
}

export const Content  = (state = initalState, action = {}) => {
  switch(action.type){

    
  case contentActionTypes.REQUEST:
    return {
      ...state,
      loading: true
    }

  case contentActionTypes.COMPLETE:
    return {
      ...state,
      loading: false
    }

  case contentActionTypes.GET_SUBJECT:
    return {
      ...state,
      subject: {
        ...state.subject,
        ...action.data
      }
    }

  case contentActionTypes.GET_CHAPTERS:
    return {
      ...state,
      chapters: action.data
    }

  case contentActionTypes.GET_COUNTS:
    return {
      ...state,
      current_chapters_stats: {
        ...state.current_chapters_stats,
        ...action.data
      }
    }

  case contentActionTypes.GET_CONTENTS:
    return {
      ...state,
      contents: action.data
    }

  default:
    return state;
  }
}