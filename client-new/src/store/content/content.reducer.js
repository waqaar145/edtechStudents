import {contentActionTypes} from './content.actiontype';

const initalState = {
  loading: false,
  subject: {
    id: null,
    subject_name: '',
    description: '',
    thumbnail: ''
  },
  subjectBasic: {
    id: null,
    subject_name: '',
    description: '',
    thumbnail: ''
  },
  current_chapters_stats: {
    id: null,
    chapter_name: '',
    chapter_number: null,
    slug: '',
    is_active: false,
    total: null,
    theories: null,
    sums: null
  },
  chapters: [],
  contents: [],
  chaptersBasic: [],
  contentsBasic: [],
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

  case contentActionTypes.GET_SUBJECT_BASIC_LIST:
    return {
      ...state,
      subjectBasic: {
        ...state.subject,
        ...action.data
      }
    }

  case contentActionTypes.GET_CHAPTERS:
    return {
      ...state,
      chapters: action.data
    }

  case contentActionTypes.GET_CHAPTERS_BASIC_LIST:
    return {
      ...state,
      chaptersBasic: action.data
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

  case contentActionTypes.GET_CONTENTS_BASIC_LIST:
    return {
      ...state,
      contentsBasic: action.data
    }

  case contentActionTypes.CHANGE_CONTENT_REACTION:
    return {
      ...state,
      contents: state.contents.map(c => {
        if (c.id === action.data.id) {
          return {
            ...c,
            liked: action.data.liked,
            total_likes: action.data.total_likes
          }
        }
        return c;
      })
    }

  case contentActionTypes.SEND_UPDATED_CONTENT_LIKE_COUNT:
    return {
      ...state,
      contents: state.contents.map(c => {
        if (c.id === action.data.id) {
          return {
            ...c,
            total_likes: action.data.total_likes
          }
        }
        return c;
      })
    }

  default:
    return state;
  }
}