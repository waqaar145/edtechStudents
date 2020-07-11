import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import storage from 'redux-persist/lib/storage'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}


const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return rootReducer(state, action);
  }
}

export const makeStore = ({req}, initialState = {}) => {
  const isServer = !!req;
  const sagaMiddleware = createSagaMiddleware();
  let store;
  if (isServer) {
    store = createStore(
      reducer,
      initialState,
      bindMiddleware([sagaMiddleware])
    )
  } else {
    const { persistStore, persistReducer } = require('redux-persist');
    const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['Content']
    };

    const persistedReducer = persistReducer(persistConfig, reducer);
    store = createStore(
      persistedReducer,
      initialState,
      bindMiddleware([sagaMiddleware])
    )

    store.__persistor = persistStore(store);
  }
  
  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(makeStore, { debug: true })