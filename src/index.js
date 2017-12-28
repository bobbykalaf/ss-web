import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import AppRoot from './AppRoot/AppRoot.react';
import registerServiceWorker from './registerServiceWorker';
import Globals from 'ss-common';

ReactDOM.render(<AppRoot />, document.getElementById('root'));
registerServiceWorker();
Globals.