import {topLevelActionTypes} from './top_level.actiontype';

const initalState = {
  semesters: [],
  subjects: [],
  current_subjects: [],
  loading: false,
  semester_loading: false,
  subject_loading: false
}

export const TopLevel  = (state = initalState, action = {}) => {
  switch(action.type){

  case topLevelActionTypes.REQUEST:
    return {
      ...state,
      loading: true
    }

  case topLevelActionTypes.COMPLETE:
    return {
      ...state,
      loading: false
    }
  
  case topLevelActionTypes.SET_ENGG_PAGE_DATA:
    const {semesters, subjects} = action.data;
    return {
      ...state,
      semesters,
      subjects,
      current_subjects: subjects.filter(subject => subject.semester_id === semesters[0].id)
    }

  case topLevelActionTypes.SET_SUBJECTS_BY_SEMESTER:
    return {
      ...state,
      current_subjects: state.subjects.filter(subject => subject.semester_id === action.data)
    }

  case topLevelActionTypes.SET_SEARCHED_SUBJECTS:
    return {
      ...state,
      current_subjects: state.subjects.filter(subject => subject.name.toLowerCase().includes(action.data.toLowerCase()))
    }

    default:
      return state;
  }
}