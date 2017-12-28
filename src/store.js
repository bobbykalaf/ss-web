import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Observable } from 'rxjs';

import { AuthState } from './authentication/actions';

var store: Store<AuthState> = createStore({}, initialState, middleware);
export const dispatch = store.dispatch;
var subscribe$ = Observable.fromEventPattern((listener) => store.subscribe(listener));
var getState = store.getState;