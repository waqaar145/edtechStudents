import {combineReducers} from 'redux';

import {Auth} from './auth/auth.reducer'
import {Constant} from './constant/constant.reducer'
import {Content} from './content/content.reducer'
import {TopLevel} from './top-level/top_level.reducer'

const rootReducer = combineReducers({
  TopLevel,
  Auth,
  Constant,
  Content
});

export default rootReducer;