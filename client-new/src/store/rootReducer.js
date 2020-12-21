import {combineReducers} from 'redux';
import {Auth} from './auth/auth.reducer';
import {TopLevel} from './top-level/top_level.reducer'
import {Content} from './content/content.reducer'

const rootReducer = combineReducers({
  Auth,
  TopLevel,
  Content
});

export default rootReducer;