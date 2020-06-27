import {contentActionTypes} from './content.actiontype';

export const actions = {
  request: () => ({type: contentActionTypes.REQUEST}),
  complete: () => ({type: contentActionTypes.COMPLETE}),
  setSubject: (data) => ({ type: contentActionTypes.GET_SUBJECT, data }),
  setChapters: (data) => ({ type: contentActionTypes.GET_CHAPTERS, data }),
  setContents: (data) => ({ type: contentActionTypes.GET_CONTENTS, data })
};