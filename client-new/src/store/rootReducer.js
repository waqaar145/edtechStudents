import {combineReducers} from 'redux';
import {Auth} from './auth/auth.reducer';
import {TopLevel} from './top-level/top_level.reducer'
import {Content} from './content/content.reducer'
import {ContentBuilder} from './contentBuilder/contentBuilder.reducer'

const rootReducer = combineReducers({
  ContentBuilder,
  Auth,
  TopLevel,
  Content
});

export default rootReducer;