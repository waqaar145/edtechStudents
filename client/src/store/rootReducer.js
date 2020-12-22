import {combineReducers} from 'redux';

import {Auth} from './auth/auth.reducer'
import {Constant} from './constant/constant.reducer'
import {Content} from './content/content.reducer'
import {TopLevel} from './top-level/top_level.reducer'
import {Builder} from './builder/builder.reducer'

const rootReducer = combineReducers({
  builder: Builder,
  TopLevel,
  Auth,
  Constant,
  Content
});

export default rootReducer;