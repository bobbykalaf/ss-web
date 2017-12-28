// @flow
import { FirebaseAuth, User, Error as AError } from '@firebase/auth-types';

export type CurrentUser = User | null;
export interface ErrorMeta {
    context: string;
    function: string;
    timestamp: TimeStamp;
}
export type AuthError = AError;
