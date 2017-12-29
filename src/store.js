// @flow
import { createStore, combineReducers, applyMiddleware, Store, Dispatch, bindActionCreators } from 'redux';
import { Observable, BehaviorSubject } from 'rxjs';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { IAuthState, IAuthActionCreators } from './authentication/types';
import Authentication from './authentication/actions';

const authActionCreators = Authentication.actionCreators;
const authInitialState = Authentication.initialState;
const authReducer = Authentication.reducer;

const logger = createLogger();
const store: Store<IAuthState> = createStore(authReducer, authInitialState, applyMiddleware(logger, thunk));
const dispatch: Dispatch<IAuthState> = store.dispatch;

export const authBoundCreators: IAuthActionCreators = bindActionCreators(authActionCreators, dispatch); 

var subject = new BehaviorSubject(1);
var subscribe$ = Observable.fromEventPattern((listener) => store.subscribe(listener));
var getState = store.getState;
