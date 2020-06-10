import {combineReducers} from 'redux';

import {Auth} from './auth/auth.reducer'
import {Constant} from './constant/constant.reducer'
import {Content} from './content/content.reducer'

const rootReducer = combineReducers({
  Auth,
  Constant,
  Content
});

export default rootReducer;