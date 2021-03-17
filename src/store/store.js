import { createStore } from "redux";
import fbReducer from "reducers/reducer";
import { combineReducers } from 'redux'

import { persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage' 
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

export const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet
}

const reducer=combineReducers({
  fbReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
  persistedReducer
);

export default store;