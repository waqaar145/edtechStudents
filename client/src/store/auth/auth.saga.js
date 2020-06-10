import { takeLatest, put, all, call } from 'redux-saga/effects';
import { authActionTypes } from './auth.actiontype';
import { actions } from './auth.action';
import { authService } from '../../services';

function* handleLoggedInUser ({headers}) {
  try {
    let result = yield authService.getLoggedInUser(headers);
    yield put(actions.setAuthUser(result.data));
  } catch (error) {
    console.log(error)
  }
}

export function* getLoggedInUser () {
  yield takeLatest(authActionTypes.WATCH_LOGGED_IN_USER, handleLoggedInUser)
}

export function* authSaga() {
  yield all([
    call(getLoggedInUser)
  ]);
}