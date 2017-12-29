// @flow
import { BehaviorSubject, Observable } from 'rxjs';
import { type FirebaseError, type FirebaseUser } from './authentication/types';
import { authBoundCreators } from './store';

const DEBUG = true;
export const log = (msg: string) => DEBUG && console.log(msg); // eslint-disable-line no-console
const firebaseAPIKey = 'AIzaSyDITYME6eu54hUEwdg113HDxCXqZu6mJMo';
const firebaseProjectID = 'smartspaces-c3f3b';
const firebaseSenderID = '507335541139';
const authDomain = `${firebaseProjectID}.firebaseapp.com`;
const databaseURL = `https://${firebaseProjectID}.firebaseio.com`;
const storageBucket = `${firebaseProjectID}.appspot.com`;

// Font Awesome
log('Loading: Font Awesome');
import './assets/fonts/svg-with-js/js/fontawesome-all.js'; // eslint-disable-line import/first

// Bootstrap
log('Loading: Bootstrap sass');
import './assets/sass/styles.scss'; // eslint-disable-line import/first

// Firebase
log('Loading: Firebase');
import firebase from '@firebase/app'; // eslint-disable-line 
import '@firebase/auth'; // eslint-disable-line import/first
import '@firebase/firestore'; // eslint-disable-line import/first

log('Imported requirements');

// import * as DB from 'firebase/database';
// import * as Firestore from 'firebase/firestore';
// import * as Messaging from 'firebase/messaging';
// import * as Storage from 'firebase/storeage';

const config = {
    apiKey: firebaseAPIKey
    , authDomain
    , databaseURL
    , messagingSenderId: firebaseSenderID
    , projectId: firebaseProjectID
    , storageBucket
};
var app = firebase.initializeApp(config);

log('initializing');

type AuthChangedEvent = (
    nextOrObserver: (a: FirebaseUser | null) => void,
    error?: (a: FirebaseError) => void,
    completed?: Unsubscribe
) => Unsubscribe;

log('auth bridge');

export class AuthBridge {
    observable: Observable<FirebaseUser>;
    dispose: () => void;
    constructor(authEvent: AuthChangedEvent) {
        log('AuthBridge ctor');
        var subject = new BehaviorSubject(app.auth().currentUser);
        authEvent(subject.next, subject.error, subject.complete);

        log('promised...');
        this.observable = subject.asObservable();
        // eslint-disable-next-line one-var
        var token = this.observable.subscribe(authBoundCreators.auth.currentuser.change,
            (err) => authBoundCreators.auth.error.received(err, 'login', 'subscribe'),
            () => this.dispose());
        log(`token: ${token}`);
        this.dispose = token.unsubscribe;
    }

    loginWithEmail = app.auth().signInWithEmailAndPassword;
    logout = app.auth().signOut;
}
// eslint-disable-next-line one-var
export const Bridge = new AuthBridge(app.auth().onAuthStateChanged);
