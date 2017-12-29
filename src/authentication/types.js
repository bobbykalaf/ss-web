// @flow
import { Error as Error$, User, UserInfo } from 'firebase';
import { Observable } from 'rxjs';

export type AuthContext = 'login' | 'logout';
export type Timestamp = number;
type AuthStage = 'anonymous' | 'fetching-login' | 'authenticated' | 'faulted' | 'fetching-logout';

export type FirebaseUser = User | void;
export type FirebaseUserInfo = UserInfo;
export type Exception = Error$ | Error

export type Action<TPayload = {}, TMeta = {}> {
    type: string,
    payload?: TPayload,
    error?: boolean,
    meta?: TMeta
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
