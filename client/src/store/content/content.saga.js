import { takeLatest, put, all, call } from 'redux-saga/effects';
import { contentActionTypes } from './content.actiontype';
import { contentService } from '../../services';
import { actions } from './content.action';

function* handleGetContents ({data: {chapters: {chapters, subject}, contents}}) {
  try {
    yield put(actions.request())
    yield put(actions.setSubject(subject))
    yield put(actions.setChapters(chapters))
    yield put(actions.setContents(contents))
  } catch (error) {
    console.log('Error', error);
  } finally {
    yield put(actions.complete())
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