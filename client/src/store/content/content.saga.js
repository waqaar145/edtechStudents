import { takeLatest, put, all, call } from 'redux-saga/effects';
import { contentActionTypes } from './content.actiontype';
import { contentService } from '../../services';
import { actions } from './content.action';

function* handleGetContents () {
  try {
    let result  = yield contentService.getContents();
    yield put(actions.getContentsAction(result.data))
    return result
  } catch (error) {
    console.log(error)
  }
}

export function* getContents () {
  yield takeLatest(contentActionTypes.WATCH_GET_CONTENT, handleGetContents)
}

export function* contentSaga() {
  yield all([
    call(getContents)
  ]);
}