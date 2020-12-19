import {combineReducers} from 'redux';
import {Auth} from './auth/auth.reducer';
import {TopLevel} from './top-level/top_level.reducer'

const rootReducer = combineReducers({
  Auth,
  TopLevel
});

export default rootReducer;