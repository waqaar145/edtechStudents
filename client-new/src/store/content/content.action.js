import {contentActionTypes} from './content.actiontype';

export const actions = {
  request: () => ({type: contentActionTypes.REQUEST}),
  complete: () => ({type: contentActionTypes.COMPLETE}),
  setChapters: (data) => ({ type: contentActionTypes.GET_CHAPTERS, data }),
  setCounts: (data) => ({ type: contentActionTypes.GET_COUNTS, data }),
  setSubject: (data) => ({ type: contentActionTypes.GET_SUBJECT, data }),
  setContents: (data) => ({ type: contentActionTypes.GET_CONTENTS, data }),
};