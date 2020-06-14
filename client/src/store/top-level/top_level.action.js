import {topLevelActionTypes} from './top_level.actiontype';

export const actions = {
  request: () => ({type: topLevelActionTypes.REQUEST}),
  complete: () => ({type: topLevelActionTypes.COMPLETE}),
  setEnggPageData: (data) => ({type: topLevelActionTypes.SET_ENGG_PAGE_DATA, data}),
  setSubjectsBySemster: (data) => ({type: topLevelActionTypes.SET_SUBJECTS_BY_SEMESTER, data}),
  setSearchedSubjects: (data) => ({type: topLevelActionTypes.SET_SEARCHED_SUBJECTS, data})
};