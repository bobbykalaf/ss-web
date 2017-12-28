// @flow
import {
	type FirebaseUser,
	type FirebaseError,
	type FetchInProgress,
	type FetchIdle,
	IAction,
	IAuthActionCreators,
	IAuthState,
	IErrorMeta,
	type AuthStage,
	type AuthContext,
	type AuthErrorWithContext,
	type FetchingStatuses
} from './types';
import Common from 'ss-common';
import { createSelector } from 'reselect';
import { createActions, handleActions } from 'redux-actions';
import firebase from '@firebase/app';
import { Observable } from 'rxjs';

export const auth_actions = {
	AUTH_CURRENT_USER_CHANGE: 'AUTH/CURRENTUSER/CHANGE',
	AUTH_LOGIN_PREPARE: 'AUTH/LOGIN/PREPARE',
	AUTH_LOGIN_BEGIN: 'AUTH/LOGIN/BEGIN',
	AUTH_LOGOUT_BEGIN: 'AUTH/LOGOUT/BEGIN',
	AUTH_ERROR_RECEIVED: 'AUTH/ERROR/RECEIVED',
	AUTH_ERROR_CLEAR: 'AUTH/ERROR/CLEAR'
};

const getCurrentUser: (state: IAuthState) => FirebaseUser = (state: IAuthState) => state.currentUser;
const getIsFetching: (state: IAuthState) => FetchingStatuses = (state: IAuthState) => state.isFetching;
const getErrorsList: (state: IAuthState) => AuthErrorWithContext[] = (state: IAuthState) => state.errorsList;
const isAuthenticated: (state: IAuthState) => boolean = createSelector(getCurrentUser, (user) => user != null);
const isFetching = createSelector(getIsFetching, (inProgress: FetchingStatuses) => inProgress.inProgress);
const isFetchingLogin = createSelector(
	getIsFetching,
	(isFetch: FetchingStatuses) => (isFetch.inProgress ? isFetch.payload.kind === 'login' : false)
);
const isFetchingLogout = createSelector(
	getIsFetching,
	(isFetch: FetchingStatuses) => (isFetch.inProgress ? isFetch.payload.kind === 'logout' : false)
);
const getFetchingObservable = createSelector(
	getIsFetching,
	(isFetch: FetchingStatuses) => (isFetch.inProgress ? isFetch.payload.observable : undefined)
);
const hasErrors = createSelector(getErrorsList, (list) => list.length > 0);
const getErrorDetails = createSelector(
	getErrorsList,
	(list: AuthErrorWithContext[]) =>
		`Error code: ${list[0].firebaseError.code}. Message: ${list[0].firebaseError.message}`
);
const getStage: (
	state: IAuthState
) => AuthStage = createSelector(
	isAuthenticated,
	isFetchingLogin,
	isFetchingLogout,
	hasErrors,
	(auth: boolean, login: boolean, logout: boolean, error: boolean) => {
		if (auth) return 'authenticated';
		if (login) return 'fetching-login';
		if (logout) return 'fetching-logout';
		if (error) return 'faulted';
		return 'anonymous';
	}
);
const selectors = {
	getCurrentUser: getCurrentUser,
	getIsFetching: getIsFetching,
	getErrorsList: getErrorsList,
	isAuthenticated: isAuthenticated,
	isFetching: isFetching,
	isFetchingLogin: isFetchingLogin,
	isFetchingLogout: isFetchingLogout,
	getFetchingObservable: getFetchingObservable,
	hasErrors: hasErrors,
	getErrorDetails: getErrorDetails,
	getLoginStage: getStage
};

const metaCreator = (context: AuthContext, functionName: string = ''): IErrorMeta => {
	return { context, functionName, timestamp: Date.now() };
};

export const actionCreators: IAuthActionCreators = createActions({
	AUTH: {
		CURRENTUSER: {
			CHANGE: (user: FirebaseUser) => user
		},
		LOGIN: {
			PREPARE: (emailAddress: string, password: string) => ({ emailAddress, password }),
			BEGIN: (observable: Observable<any>) => ({ observable })
		},
		LOGOUT: {
			BEGIN: () => ({})
		},
		ERROR: {
			RECEIVED: [
				(exception: FirebaseError) => exception,
				(exception: FirebaseError, context: AuthContext, functionName: string) =>
					metaCreator(context, functionName)
			],
			CLEAR: (index: number) => ({ index })
		}
	}
});
export function prepareLogin(email: string, password: string) {
	var loginObservable$ = Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(email, password));
	return function(dispatch: (action: IAction<any, any>) => void) {
		dispatch(actionCreators.auth.login.begin(loginObservable$));
	};
}
var createInProgress = (authKind: AuthContext, obs?: Observable<any>): FetchInProgress => ({
	inProgress: true,
	payload: {
		kind: authKind,
		observable: obs
	}
});
var userChanged = (state: IAuthState, action: IAction<FirebaseUser, *>): IAuthState => ({
	...state,
	currentUser: action.payload
});
var loginBegin = (state: IAuthState, action: IAction<Observable<any>, *>): IAuthState => ({
	...state,
	isFetching: createInProgress('login', action.payload)
});
var logoutBegin = (state: IAuthState, action: IAction<*, *>): IAuthState => ({
	...state,
	isFetching: createInProgress('logout', undefined)
});
var makeErrorWithContext = (firebaseError: FirebaseError, meta: IErrorMeta | void): AuthErrorWithContext => ({
	firebaseError,
	meta
});
var errorReceive = (state: IAuthState, action: IAction<FirebaseError, IErrorMeta>): IAuthState => ({
	...state,
	errorsList: [ ...state.errorsList, makeErrorWithContext(action.payload, action.meta) ]
});
var errorClear = (state: IAuthState, action: IAction<number>): IAuthState => ({
	...state,
	errorsList: state.errorsList.filter((v, ix) => ix !== action.payload)
});

var createIdle: FetchIdle = { inProgress: false, payload: {} };
var initialState: IAuthState = {
	currentUser: null,
	errorsList: [],
	isFetching: createIdle
};
export const reducer = handleActions(
	{
		[auth_actions.AUTH_CURRENT_USER_CHANGE]: userChanged,
		[auth_actions.AUTH_LOGIN_BEGIN]: loginBegin,
		[auth_actions.AUTH_LOGOUT_BEGIN]: logoutBegin,
		[auth_actions.AUTH_LOGIN_PREPARE]: (state, action) => state,
		[auth_actions.AUTH_ERROR_RECEIVED]: errorReceive,
		[auth_actions.AUTH_ERROR_CLEAR]: errorClear
	},
	initialState
);
