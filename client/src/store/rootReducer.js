import {combineReducers} from 'redux';

import {Constant} from './constant/constant.reducer'
import {Content} from './content/content.reducer'

const rootReducer = combineReducers({
  Constant,
  Content
});

export default rootReducer;