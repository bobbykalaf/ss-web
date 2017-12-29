// @flow
import {
    type AuthContext,
    AuthErrorWithContextConstructor,
    type FirebaseError,
    type FirebaseUser,
    IAction,
    IAuthActionCreators,
    type IAuthSelectors,
    IAuthState,
    IdleFetchConstructor,
    IErrorMeta,
    IErrorMetaConstructor,
    InProgressFetchConstructor
} from './types';

import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import firebase from '@firebase/app';
import { Observable } from 'rxjs';

export const AUTH_ACTIONS = {
    AUTH_CURRENT_USER_CHANGE: 'AUTH/CURRENTUSER/CHANGE'
    , AUTH_ERROR_CLEAR: 'AUTH/ERROR/CLEAR'
    , AUTH_ERROR_RECEIVED: 'AUTH/ERROR/RECEIVED'
    , AUTH_LOGIN_BEGIN: 'AUTH/LOGIN/BEGIN'
    , AUTH_LOGIN_PREPARE: 'AUTH/LOGIN/PREPARE'
    , AUTH_LOGOUT_BEGIN: 'AUTH/LOGOUT/BEGIN'
};

const actionCreators = createActions({
    AUTH: {
        CURRENTUSER: {
            CHANGE: (user: FirebaseUser) => ({ user })
        }
        , ERROR: {
            CLEAR: (index: number) => ({ index })
            , RECEIVED: [
                (exception: FirebaseError) => exception
                , (exception: FirebaseError, context: AuthContext, functionName: string) =>
                    IErrorMetaConstructor(context, functionName)
            ]
        }
        , LOGIN: {
            BEGIN: (observable: Observable<any>) => ({ observable })
            , PREPARE: (emailAddress: string, password: string) => ({ emailAddress, password })
        }
        , LOGOUT: { BEGIN: () => ({}) }
    }
});

const reducer = handleActions({
    [AUTH_ACTIONS.AUTH_CURRENT_USER_CHANGE]: (state: IAuthState, action: IAction<FirebaseUser, *>): IAuthState => ({
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
initialState);

export const Authentication = {
    actionCreators
    , actions: AUTH_ACTIONS
    , initialState
    , reducer
    , selectors: selectors()
};

export interface IReduxAuth {
    actions: { [key: string]: string };
    actionCreators: IAuthActionCreators;
    selectors: IAuthSelectors;
    initialState: IAuthState;
    reducer: (state: IAuthState, action) => IAuthState;
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
