import {contentActionTypes} from './content.actiontype';

export const actions = {
  getContentsAction: (data) => ({ type: contentActionTypes.GET_CONTENT, data })
};