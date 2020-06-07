import {call, all} from 'redux-saga/effects';
import {constantSaga} from './constant/constant.saga';
import {contentSaga} from './content/content.saga';

function* rootSaga() {
  yield all([
    call(constantSaga),
    call(contentSaga)
  ]);
}

export default rootSaga;