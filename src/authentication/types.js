// @flow

import { Observable } from 'rxjs';
import firebase from '@firebase/app';
import { User, UserInfo, Error as Exception } from '@firebase/auth-types';

export type FirebaseUser = User;
export type FirebaseUserInfo = UserInfo;
export type FirebaseError = Exception;
export type AuthErrorWithContext = {
	firebaseError: FirebaseError,
	meta?: IErrorMeta
};

export type AuthStage = 'anonymous' | 'fetching-login' | 'authenticated' | 'faulted' | 'fetching-logout';
export type TimeStamp = number;
export type CurrentUser = FirebaseUser | void;
export type AuthContext = 'login' | 'logout';
export interface IErrorMeta {
	context: AuthContext,
	functionName: string,
	timestamp: TimeStamp
}

type BoolLiteral = true | false;
export type IFetchStatus<BoolLiteral, T> = {
	inProgress: BoolLiteral,
	payload: T
};
export interface Fetching {
	kind: 'login' | 'logout',
	observable?: Observable<any>
}
export type FetchIdle = IFetchStatus<false, {}>;
export type FetchInProgress = IFetchStatus<true, Fetching>;
export type FetchingStatuses = FetchIdle | FetchInProgress;

const stageTransitionMap = {
	anonymous: [ 'fetching-login' ],
	'fetching-login': [ 'authenticated', 'faulted' ],
	authenticated: [ 'fetching-logout' ],
	faulted: [ 'anonymous' ],
	'fetching-logout': [ 'anonymous', 'faulted' ]
};
interface Credentials {
	emailAddress: string,
	password: string
}
export interface IAction<TPayload = {}, TMeta = {}> {
	type: string,
	payload?: TPayload,
	error?: Error,
	meta?: TMeta
}
export interface IAuthState {
	currentUser: FirebaseUser,
	isFetching: FetchingStatuses,
	errorsList: AuthErrorWithContext[]
}
export interface IAuthActionCreators {
	auth: {
		currentuser: {
			change: (user: FirebaseUser) => IAction<FirebaseUser>
		},
		login: {
			prepare: (emailAddress: string, password: string) => IAction<Credentials>,
			begin: (observable: Observable<any>) => IAction<Observable<any>, *>
		},
		logout: {
			begin: () => IAction<*, *>
		},
		error: {
			received: (
				exception: FirebaseError,
				context?: 'login' | 'logout',
				functionName: string
			) => IAction<Error, 'login' | 'logout'>,
			clear: (index: number) => IAction<number>
		}
	}
}
