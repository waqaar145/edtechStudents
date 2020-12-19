import {call, all} from 'redux-saga/effects';
import {authSaga} from './auth/auth.saga';
import {topLevelSaga} from './top-level/top_level.saga';

function* rootSaga() {
  yield all([
    call(authSaga),
    call(topLevelSaga)
  ]);
}

export default rootSaga;