// @flow
import { CurrentUser, AuthError } from './types';

export const AUTH_STAGE_UPDATE = 'AUTH/STAGE/UPDATE';
export const CURRENT_USER_CHANGE = 'AUTH/CURRENTUSER/CHANGE';
export const AUTH_LOGIN_LOGIN = 'AUTH/LOGIN/BEGIN'
export const AUTH_LOGOUT_BEGIN = 'AUTH/LOGOUT/BEGIN';
export const AUTH_ERROR_RECEIVED = 'AUTH/ERROR/RECEIVED';
export const AUTH_ERROR_CLEAR = 'AUTH/ERROR/CLEAR';

type AuthStage = "logged-out" | "sent-credentials" | "logged-in" | "faulted" | "logging-out";

interface AuthState {
    currentUser: CurrentUser;
    isFetching: "login" | "logout" | "none";
    errorsList: AuthError [];
}