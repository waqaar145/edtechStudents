import {contentActionTypes} from './content.actiontype';

export const actions = {
  request: () => ({type: contentActionTypes.REQUEST}),
  complete: () => ({type: contentActionTypes.COMPLETE}),
  setChapters: (data) => ({ type: contentActionTypes.GET_CHAPTERS, data }),
  setChaptersBasicList: (data) => ({ type: contentActionTypes.GET_CHAPTERS_BASIC_LIST, data }),
  setCounts: (data) => ({ type: contentActionTypes.GET_COUNTS, data }),
  setSubject: (data) => ({ type: contentActionTypes.GET_SUBJECT, data }),
  setSubjectBasicList: (data) => ({ type: contentActionTypes.GET_SUBJECT_BASIC_LIST, data }),
  setContents: (data) => ({ type: contentActionTypes.GET_CONTENTS, data }),
  setContentsBasicList: (data) => ({ type: contentActionTypes.GET_CONTENTS_BASIC_LIST, data }),
};