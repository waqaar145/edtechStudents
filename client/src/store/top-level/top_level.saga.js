import { takeLatest, put, all, call } from 'redux-saga/effects';
import { topLevelActionTypes } from './top_level.actiontype';
import { actions } from './top_level.action';
import { authService } from '../../services';

function* handleEnggPageData ({data}) {
  try {
    yield put(actions.request())
    yield put(actions.setEnggPageData(data));
  } catch (error) {
    console.log(error)
  } finally {
    yield put(actions.complete())
  }
}

export function* getEnggPageData () {
  yield takeLatest(topLevelActionTypes.WATCH_ENGG_PAGE_CHANGES, handleEnggPageData)
}

export function* topLevelSaga() {
  yield all([
    call(getEnggPageData)
  ]);
}