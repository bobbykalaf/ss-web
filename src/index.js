// @flow
import './dependencies';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import AppRoot from './AppRoot/AppRoot.react';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppRoot />, document.getElementById('root'));
registerServiceWorker();