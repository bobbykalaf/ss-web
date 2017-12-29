// @flow
import { AuthContext, Exception, Timestamp } from './types';

interface IExceptionContext {
    context?: AuthContext,
    timestamp: Timestamp
}
export type AuthException<TError = Error> = {
    exception: TError,
    context?: IExceptionContext
};

function ExceptionContextConstructor(context: AuthContext): IExceptionContext {
    return { context, timestamp: Date.now() };
}

function AuthExceptionConstructor(exception: Error, context?: AuthContext): AuthException {
    return {
        context: ExceptionContextConstructor(context)
        , exception
    };
}
export const LoginExceptionConstructor = (exception: Exception) => AuthExceptionConstructor(exception, 'login');
export const LogoutExceptionConstructor = (exception: Exception) => AuthExceptionConstructor(exception, 'logout');
export const UnknownContextConstructor = (exception: Exception) => AuthExceptionConstructor(exception);
