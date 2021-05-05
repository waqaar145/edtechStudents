import { takeLatest, put, all, call } from 'redux-saga/effects';
import { topLevelActionTypes } from './top_level.actiontype';
import { actions } from './top_level.action';
import { topLevelService } from '../../services';

function* handleEnggPageData () {
  try {
    yield put(actions.request());
    let semesters = yield topLevelService.getSemesters();
    let subjects = yield topLevelService.getSubjects();
    yield put(actions.setEnggPageData({semesters: semesters.data.data, subjects: subjects.data.data}))
    yield put(actions.success());
  } catch (error) {
    yield put(actions.failed());
  }
}

function* handleSemestesSelected ({id}) {
  yield put(actions.getSubjectsBySemesterId({data: id}));
}

export function* getEnggPageData () {
  yield takeLatest(topLevelActionTypes.WATCH_ENGG_PAGE_CHANGES, handleEnggPageData)
}

export function* getSubjectsBySemsterId (id) {
  yield takeLatest(topLevelActionTypes.WATCH_SEMESTER_SELECTED, handleSemestesSelected)
}

export function* topLevelSaga() {
  yield all([
    call(getEnggPageData),
    call(getSubjectsBySemsterId)
  ]);
}