import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from './ServiceWorker';
import App from './router/App';
import "assets/scss/material-kit-react.scss?v=1.9.0";



ReactDOM.render(
	<React.StrictMode>
	  <App />
	</React.StrictMode>,
	document.getElementById('root')
);
registerServiceWorker();