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

function* handleSubjectsBySemster ({data}) {
  yield put(actions.setSubjectsBySemster(data))
}

function* handleSearchSubjects ({data}) {
  yield put(actions.setSearchedSubjects(data))
}

export function* getEnggPageData () {
  yield takeLatest(topLevelActionTypes.WATCH_ENGG_PAGE_CHANGES, handleEnggPageData)
}

export function* showSubjectsBySemster () {
  yield takeLatest(topLevelActionTypes.WATCH_SEMESTER_CHANGE, handleSubjectsBySemster)
}

export function* searchSubjects () {
  yield takeLatest(topLevelActionTypes.WATCH_SEARCH_SUBJECTS, handleSearchSubjects)
}

export function* topLevelSaga() {
  yield all([
    call(getEnggPageData),
    call(showSubjectsBySemster),
    call(searchSubjects)
  ]);
}