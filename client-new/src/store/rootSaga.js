import {call, all} from 'redux-saga/effects';
import {authSaga} from './auth/auth.saga';

function* rootSaga() {
  yield all([
    call(authSaga)
  ]);
}

export default rootSaga;