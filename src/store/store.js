import { createStore,compose } from "redux";
import fbReducer from "reducers/reducer";
import { combineReducers } from 'redux'
import { persistentReducer,persistentStore } from 'redux-pouchdb'

import PouchDB from 'pouchdb'

const db = new PouchDB('todomvc');
const reducer=combineReducers({
  fbReducer
})

const store = createStore(
  persistentReducer(reducer),
  compose(persistentStore(db))
  );

export default store;