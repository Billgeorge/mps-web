import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from './ServiceWorker';
import App from './router/App';
import "assets/scss/material-kit-react.scss?v=1.9.0";
import { Provider } from "react-redux";
import store from "store/store";


ReactDOM.render(
	<Provider store={store}>
	  <App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();