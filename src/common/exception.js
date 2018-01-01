// @flow
import { AuthPhase, Exception, Timestamp } from './../authentication/types';

interface IExceptionContext {
    authPhase?: AuthPhase,
    timestamp: Timestamp
}
export type AuthException<TError = Error> = {
    exception: TError,
    context?: IExceptionContext
};

function ExceptionContextConstructor(authPhase: AuthPhase): IExceptionContext {
    return { authPhase, timestamp: Date.now() };
}

function AuthExceptionConstructor(exception: Error, authPhase?: AuthPhase): AuthException {
    return {
        context: ExceptionContextConstructor(authPhase)
        , exception
    };
}

export const LoginExceptionConstructor = (exception: Exception) => AuthExceptionConstructor(exception, 'login');
export const LogoutExceptionConstructor = (exception: Exception) => AuthExceptionConstructor(exception, 'logout');
export const UnknownContextConstructor = (exception: Exception) => AuthExceptionConstructor(exception);

