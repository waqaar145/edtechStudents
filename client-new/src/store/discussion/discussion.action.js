import {commentActionTypes} from './discussion.actiontype';

export const actions = {
  request: () => ({type: commentActionTypes.REQUEST}),
  complete: () => ({type: commentActionTypes.COMPLETE}),

  requestComment: () => ({type: commentActionTypes.REQUEST_COMMENT}),
  completeComment: () => ({type: commentActionTypes.COMPLETE_COMMENT}),

  startPagination: (data) => ({type: commentActionTypes.START_PAGINATION, data: data}),
  updateQueryParams: (data) => ({type: commentActionTypes.UPDATE_QUERY_PARAMS, data}),

  setDiscussionContent: (data) => ({ type: commentActionTypes.GET_CONTENT, data }),
  getComments: (data) => ({type: commentActionTypes.GET_COMMENTS, data}),
  emtyData: () => ({type: commentActionTypes.EMPTY_ALL_DATA})
};