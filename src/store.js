// @flow
import { applyMiddleware, bindActionCreators, createStore } from 'redux';

import { AuthState } from './authentication/state';
// eslint-disable-next-line import/no-named-as-default
import Authentication from './authentication/actions';
import { createLogger } from 'redux-logger';

import { log } from './index';
import { Observable } from 'rxjs';
import type { Store } from './redux/types';
import thunk from 'redux-thunk';

// eslint-disable-next-line import/no-named-as-default-member
const { actionCreators: authActionCreators, initialState: authInitialState, reducer: authReducer } = Authentication;
const reduxLogger = createLogger();
const applicationStore: Store<IAuthState> = createStore(authReducer, authInitialState, applyMiddleware(reduxLogger, thunk));

export const subscribe$ = Observable.fromEventPattern((listener) => applicationStore.subscribe(listener));

export const authBoundCreators = {
    changed: bindActionCreators(authActionCreators.auth.currentuser.change, applicationStore.dispatch)
    , error: bindActionCreators(authActionCreators.auth.error.received, applicationStore.dispatch)
};
log(`bound: ${JSON.stringify(authBoundCreators)}`);
