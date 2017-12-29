// @flow
import { applyMiddleware, bindActionCreators, createStore } from 'redux';

// eslint-disable-next-line import/no-named-as-default
import Authentication from './authentication/actions';
import { createLogger } from 'redux-logger';
import { IAuthState } from './authentication/types';
import { log } from './index';
import { Observable } from 'rxjs';
import type { Store } from './redux/types';
import thunk from 'redux-thunk';

// eslint-disable-next-line import/no-named-as-default-member
const { actionCreators: authActionCreators, initialState: authInitialState, reducer: authReducer } = Authentication;
const logger = createLogger();
const applicationStore: Store<IAuthState> = createStore(authReducer, authInitialState, applyMiddleware(logger, thunk));

export const subscribe$ = Observable.fromEventPattern((listener) => applicationStore.subscribe(listener));

// console.log(JSON.stringify(bindActionCreators(authActionCreators, store.dispatch))); //eslint-disable-line no-console
// console.log(JSON.stringify(Object.keys(bindActionCreators(authActionCreators, store.dispatch)))); //eslint-disable-line no-console
// console.log(JSON.stringify(bindActionCreators(authActionCreators, store.dispatch).auth)); //eslint-disable-line no-console
// console.log(JSON.stringify(bindActionCreators(authActionCreators, store.dispatch).auth.currentuser)); //eslint-disable-line no-console
// console.log(JSON.stringify(bindActionCreators(authActionCreators, store.dispatch).auth.currentuser.change(null))); //eslint-disable-line no-console

export const authBoundCreators = bindActionCreators(authActionCreators, applicationStore.dispatch);
log(`bound: ${JSON.stringify(authBoundCreators)}`);
