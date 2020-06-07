import {constantActionTypes} from './constant.actiontype';
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper';

const initalState = {}

export const Constant  = (state = initalState, action = {}) => {
  switch(action.type){

    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return {...state, ...action.payload};

    default:
      return state;
  }
}