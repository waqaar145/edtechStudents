import {call, all} from 'redux-saga/effects';
import {authSaga} from './auth/auth.saga';
import {constantSaga} from './constant/constant.saga';
import {contentSaga} from './content/content.saga';

function* rootSaga() {
  yield all([
    call(authSaga),
    call(constantSaga),
    call(contentSaga)
  ]);
}

export default rootSaga;