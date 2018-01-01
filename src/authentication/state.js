// @flow
import { type AuthPhase, type User } from './types';
import { type AuthException } from './../common/exception';
import { Observable } from '@reactivex/rxjs';

function IdleConstructor(): Idle {
    return {};
}
function FetchingConstructor(context: AuthPhase, observable?: Observable<any>): Fetching {
    return {
        context
        , observable
    };
}
const idleFetchingStatus = IdleConstructor;
const loginFetchingStatus = (observable?: Observable<any>) => FetchingConstructor('login', observable);
const logoutFetchingStatus = (observable?: Observable<any>) => FetchingConstructor('logout', observable);

type AuthStateShape = {
    +currentUser: User,
    +isFetching: FirebaseAuthStatus,
    +errorsList: AuthException<*>[]
}

function AuthStateConstructor(currentUser: User,
    errorsList: AuthException<*>[],
    isFetching: FirebaseAuthStatus): AuthStateShape {
    return {
        currentUser
        , errorsList
        , isFetching
    };
}

const initialState: AuthStateShape = AuthStateConstructor(null, [], idleFetchingStatus());

var output = {
    idleFetchingStatus
    , initialState
    , loginFetchingStatus
    , logoutFetchingStatus
};
export default output;
