// @flow
import { applyMiddleware, bindActionCreators, createStore } from 'redux';
import { IAuthActionCreators, IAuthState } from './authentication/types';

// eslint-disable-next-line import/no-named-as-default
import Authentication from './authentication/actions';
import { createLogger } from 'redux-logger';
import { log } from './dependencies';
import { Observable } from 'rxjs';
import type { Store } from './redux/types';
import thunk from 'redux-thunk';

// eslint-disable-next-line import/no-named-as-default-member
const { actionCreators: authActionCreators, initialState: authInitialState, reducer: authReducer } = Authentication;
const logger = createLogger();
const store: Store<IAuthState> = createStore(authReducer, authInitialState, applyMiddleware(logger, thunk));

export const subscribe$ = Observable.fromEventPattern((listener) => store.subscribe(listener));

log(`authActionCreators: ${JSON.stringify(authActionCreators)}`);
export const authBoundCreators: IAuthActionCreators = bindActionCreators(authActionCreators, store.dispatch);
log(`bound: ${JSON.stringify(authBoundCreators)}`);
