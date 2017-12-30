// @flow
import { type AuthPhase, type FirebaseUser } from './types';
import { type AuthException } from './../common/exception';
import { Observable } from 'rxjs';

type Idle = {};
type Fetching = { context?: AuthContext, observable?: Observable<any> };

type FirebaseAuthStatus = Idle | Fetching;

function IdleConstructor(): Idle {
    return {};
}
function FetchingConstructor(context: AuthPhase, observable?: Observable<any>): Fetching {
    return {
        context
        , observable
    };
}
export const idleFetchingStatus = IdleConstructor;
export const loginFetchingStatus = (observable?: Observable<any>) => FetchingConstructor('login', observable);
export const logoutFetchingStatus = (observable?: Observable<any>) => FetchingConstructor('logout', observable);

type AuthStateShape = {
    +currentUser: FirebaseUser,
    +isFetching: FirebaseAuthStatus,
    +errorsList: AuthException[]
};

opaque type AuthState = $ReadOnly<AuthStateShape>;
export function AuthStateConstructor(currentUser: FirebaseUser,
    errorsList: AuthException[],
    isFetching: FirebaseAuthStatus): AuthStateShape {
    return {
        currentUser
        , errorsList
        , isFetching
    };
}

export const initialState: AuthState = AuthStateConstructor(null, [], idleFetchingStatus());

module.exports = {
    AuthStateShape
    , initialState
};
