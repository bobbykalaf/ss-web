// @flow
import {
    type FirebaseUser,
    type FirebaseError,
    type IAuthSelectors,
    IAction,
    IAuthActionCreators,
    IAuthState,
    IErrorMeta,
    type AuthContext,
    AuthErrorWithContextConstructor,
    FetchIdleConstructor,
    IErrorMetaConstructor,
    InProgressFetchConstructor
} from './types';

import { createSelector } from 'reselect';
import { createActions, handleActions } from 'redux-actions';
import firebase from '@firebase/app';
import { Observable } from 'rxjs';

export const AUTH_ACTIONS = {
        AUTH_CURRENT_USER_CHANGE: 'AUTH/CURRENTUSER/CHANGE'
        , AUTH_LOGIN_PREPARE: 'AUTH/LOGIN/PREPARE'
        , AUTH_LOGIN_BEGIN: 'AUTH/LOGIN/BEGIN'
        , AUTH_LOGOUT_BEGIN: 'AUTH/LOGOUT/BEGIN'
        , AUTH_ERROR_RECEIVED: 'AUTH/ERROR/RECEIVED'
        , AUTH_ERROR_CLEAR: 'AUTH/ERROR/CLEAR'
    }
    , selectors: () => IAuthSelectors = () => {
        var selectCurrentUser = (state) => state.currentUser
            , selectFetchingStatus = (state) => state.isFetching
            , selectAuthErrorList = (state) => state.errorsList;
        // eslint-disable-next-line one-var
        var queryIsAuthenticated = createSelector(selectCurrentUser, (user) => user != null)
            , queryIsFetchInProgress = createSelector(selectFetchingStatus, (status) => status.inProgress)
            , queryIsLoginFetchInProgress = createSelector(selectFetchingStatus,
                (isFetch) => isFetch.inProgress ?
                    isFetch.payload.kind === 'login' :
                    false)
            , queryIsLogoutFetchInProgress = createSelector(selectFetchingStatus,
                (isFetch) => isFetch.inProgress ?
                    isFetch.payload.kind === 'logout' :
                    false)
            , queryFetchingObservable = createSelector(selectFetchingStatus,
                (isFetch) => isFetch.inProgress ?
                    isFetch.payload.observable :
                    undefined)
            , queryIsCurrentFaulted = createSelector(selectAuthErrorList, (list) => list.length > 0) // eslint-disable-line no-magic-numbers
            , queryFirstError = createSelector(selectAuthErrorList,
                (list) => `Error code: ${list[0].firebaseError.code}. Message: ${list[0].firebaseError.message}`) // eslint-disable-line no-magic-numbers
            , queryLoginStage = createSelector(queryIsAuthenticated,
                queryIsLoginFetchInProgress,
                queryIsLogoutFetchInProgress,
                queryIsCurrentFaulted,
                (auth: boolean, login: boolean, logout: boolean, error: boolean) => {
                    if (auth) {
                        return 'authenticated';
                    }
                    if (login) {
                        return 'fetching-login';
                    }
                    if (logout) {
                        return 'fetching-logout';
                    }
                    if (error) {
                        return 'faulted';
                    }
                    return 'anonymous';
                });
        return {
            selectCurrentUser
            , selectFetchingStatus
            , selectAuthErrorList
            , queryIsAuthenticated
            , queryIsFetchInProgress
            , queryIsLoginFetchInProgress
            , queryIsLogoutFetchInProgress
            , queryFetchingObservable
            , queryIsCurrentFaulted
            , queryFirstError
            , queryLoginStage
        };
    }
    , actionCreators: IAuthActionCreators = createActions({
        AUTH: {
            CURRENTUSER: { CHANGE: (user: FirebaseUser) => user }
            , LOGIN: {
                PREPARE: (emailAddress: string, password: string) => ({ emailAddress, password })
                , BEGIN: (observable: Observable<any>) => ({ observable })
            }
            , LOGOUT: { BEGIN: () => ({}) }
            , ERROR: {
                RECEIVED: [
                    (exception: FirebaseError) => exception
                    , (exception: FirebaseError, context: AuthContext, functionName: string) => IErrorMetaConstructor(context, functionName)
                ]
                , CLEAR: (index: number) => ({ index })
            }
        }
    })
    , initialState: IAuthState = {
        currentUser: null
        , errorsList: []
        , isFetching: FetchIdleConstructor()
    }
    , reducer = handleActions({
        [AUTH_ACTIONS.AUTH_CURRENT_USER_CHANGE]: (state: IAuthState,
            action: IAction<FirebaseUser, *>): IAuthState => ({
            ...state
            , currentUser: action.payload
        })
        , [AUTH_ACTIONS.AUTH_LOGIN_BEGIN]: (state: IAuthState, action: IAction<Observable<any>, *>): IAuthState => ({
            ...state
            , isFetching: InProgressFetchConstructor('login', action.payload)
        })
        // eslint-disable-next-line no-unused-vars
        , [AUTH_ACTIONS.AUTH_LOGOUT_BEGIN]: (state: IAuthState, action: IAction<*, *>): IAuthState => ({
            ...state
            , isFetching: InProgressFetchConstructor('logout', undefined)
        })
        // eslint-disable-next-line no-unused-vars
        , [AUTH_ACTIONS.AUTH_LOGIN_PREPARE]: (state, action) => state
        , [AUTH_ACTIONS.AUTH_ERROR_RECEIVED]: (state: IAuthState,
            action: IAction<FirebaseError, IErrorMeta>): IAuthState => ({
            ...state
            , errorsList: [
                ...state.errorsList
                , AuthErrorWithContextConstructor(action.payload, action.meta)
            ]
        })
        , [AUTH_ACTIONS.AUTH_ERROR_CLEAR]: (state: IAuthState, action: IAction<number>): IAuthState => ({
            ...state
            , errorsList: state.errorsList.filter((v, ix) => ix !== action.payload)
        })
    },
    initialState)
    , Authentication = {
        actions: AUTH_ACTIONS
        , actionCreators: actionCreators
        , selectors: selectors()
        , initialState
        , reducer
    };

export interface IReduxAuth {
    actions: { [key: string]: string },
    actionCreators: IAuthActionCreators,
    selectors: IAuthSelectors,
    initialState: IAuthState,
    reducer: (state: IAuthState, action) => IAuthState
}

export default Authentication;

export interface ReduxSummary<TState> {
    initialState: TState,
    reducer: (state: TState, action) => TState
}

export function prepareLogin(email: string, password: string) {
    var loginObservable$ = Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(email, password));
    return function(dispatch: (action: IAction<any, any>) => void) {
        dispatch(actionCreators.auth.login.begin(loginObservable$));
    };
}
