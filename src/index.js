import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from './ServiceWorker';
import App from './router/App';
import "assets/scss/material-kit-react.scss?v=1.9.0";
import { Provider } from "react-redux";
import store from "store/store";
import {persistConfig} from "store/store";

import crossBrowserListener from 'util/reduxpersist-listener'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

window.addEventListener('storage', crossBrowserListener(store, persistConfig));


ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
	  		<App />
		</PersistGate>	  
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();