import {call, all} from 'redux-saga/effects';
import {authSaga} from './auth/auth.saga';
import {topLevelSaga} from './top-level/top_level.saga';
import {contentSaga} from './content/content.saga';
import {contentBuilderSaga} from './contentBuilder/contentBuilder.saga';

function* rootSaga() {
  yield all([
    call(authSaga),
    call(topLevelSaga),
    call(contentSaga),
    call(contentBuilderSaga)
  ]);
}

export default rootSaga;