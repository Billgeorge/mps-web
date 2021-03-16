import { createStore,applyMiddleware } from "redux";
import fbReducer from "reducers/reducer";
import { combineReducers } from 'redux'
import { createStateSyncMiddleware, withReduxStateSync } from 'redux-state-sync'


const config = {}
const middlewares = [
  createStateSyncMiddleware(config),
]

const reducer=combineReducers({
  fbReducer
})

/*const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );*/
const store = createStore(withReduxStateSync(reducer), {}, applyMiddleware(...middlewares))

export default store;