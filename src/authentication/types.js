// @flow

import { Observable } from 'rxjs';
import { User, UserInfo, Error as Exception } from 'firebase';

export type AuthStage = 'anonymous' | 'fetching-login' | 'authenticated' | 'faulted' | 'fetching-logout';
export type AuthContext = 'login' | 'logout';

export type TimeStamp = number;
export type FirebaseUser = User;
export type FirebaseUserInfo = UserInfo;
export type FirebaseError = Exception;

export interface IErrorMeta {
    context: AuthContext,
    functionName: string,
    timestamp: TimeStamp
}
export interface IAction<TPayload = {}, TMeta = {}> {
    type: string,
    payload?: TPayload,
    error?: FirebaseError,
    meta?: TMeta
}

export type AuthErrorWithContext = {
    firebaseError: FirebaseError,
    meta?: IErrorMeta
};

// export type CurrentUser = FirebaseUser | void;

export type FetchingStatus<TBool: boolean, T = {}> = {
    inProgress: TBool,
    payload: T
};

export type FetchIdle = FetchingStatus<false>;
export type FetchInProgress = FetchingStatus<
    true,
    {
        kind: AuthContext,
        observable?: Observable<any>
    }
>;
export type FetchingStatuses = FetchIdle | FetchInProgress;
export interface IAuthState {
    currentUser: FirebaseUser | null,
    isFetching: FetchingStatuses,
    errorsList: AuthErrorWithContext[]
}

export function IErrorMetaConstructor(context: AuthContext, functionName: string = ''): IErrorMeta {
    return { context, functionName, timestamp: Date.now() };
}
export function InProgressFetchConstructor(authKind: AuthContext, obs?: Observable<any>): FetchInProgress {
    return {
        inProgress: true
        , payload: {
            kind: authKind
            , observable: obs
        }
    };
}
export function IdleFetchConstructor(): FetchingStatuses {
    return { inProgress: false, payload: {} };
}
export function AuthErrorWithContextConstructor(firebaseError: FirebaseError,
    meta: IErrorMeta | void): AuthErrorWithContext {
    return {
        firebaseError
        , meta
    };
}
export interface IAuthSelectors {
    selectCurrentUser: (state: IAuthState) => FirebaseUser,
    selectFetchingStatus: (state: IAuthState) => FetchingStatuses,
    selectAuthErrorList: (state: IAuthState) => AuthErrorWithContext[],
    queryIsAuthenticated: (state: IAuthState) => boolean,
    queryIsFetchInProgress: (state: IAuthState) => boolean,
    queryIsLoginFetchInProgress: (state: IAuthState) => boolean,
    queryIsLogoutFetchInProgress: (state: IAuthState) => boolean,
    queryFetchingObservable: (state: IAuthState) => Observable<any> | void,
    queryIsCurrentFaulted: (state: IAuthState) => boolean,
    queryFirstError: (state: IAuthState) => string,
    queryLoginStage: (state: IAuthState) => AuthStage
}

interface Credentials {
    emailAddress: string,
    password: string
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
