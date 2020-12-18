import {topLevelActionTypes} from './top_level.actiontype';

export const actions = {
  setEnggPageData: (data) => ({type: topLevelActionTypes.SET_ENGG_PAGE_DATA, data}),
  getSubjectsBySemesterId: (data) => ({type: topLevelActionTypes.SET_SUBJECTS_BY_SEMESTER, data}),

  request: () => ({type: topLevelActionTypes.REQUEST}),
  success: () => ({type: topLevelActionTypes.SUCCESS}),
  failed: () => ({type: topLevelActionTypes.FAILED}),
};