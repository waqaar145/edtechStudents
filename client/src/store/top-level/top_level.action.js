import {topLevelActionTypes} from './top_level.actiontype';

export const actions = {
  request: () => ({type: topLevelActionTypes.REQUEST}),
  complete: () => ({type: topLevelActionTypes.COMPLETE}),
  setEnggPageData: (data) => ({type: topLevelActionTypes.SET_ENGG_PAGE_DATA, data})
};