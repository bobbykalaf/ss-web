// @flow
/* eslint-disable sort-imports */
export const DEBUG = true;
export function log(msg: string) {
    if (DEBUG) {
        console.log(msg); // eslint-disable-line no-console
    }
}
import './dependencies';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import AppRoot from './AppRoot/AppRoot.react';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppRoot />, document.getElementById('root'));
registerServiceWorker();