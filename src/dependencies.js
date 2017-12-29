// @flow
import { Observable } from 'rxjs';
import { type FirebaseUser, type FirebaseError } from './authentication/types';
import { authBoundCreators } from './store';

const DEBUG = true
    , log = (msg: string) => DEBUG && console.log(msg) // eslint-disable-line no-console
    , firebaseAPIKey = 'AIzaSyDITYME6eu54hUEwdg113HDxCXqZu6mJMo'
    , firebaseProjectID = 'smartspaces-c3f3b'
    , firebaseSenderID = '507335541139'
    , authDomain = `${firebaseProjectID}.firebaseapp.com`
    , databaseURL = `https://${firebaseProjectID}.firebaseio.com`
    , storageBucket = `${firebaseProjectID}.appspot.com`;
// Font Awesome
log('Loading: Font Awesome');
import './assets/fonts/svg-with-js/js/fontawesome-all.js'; // eslint-disable-line import/first

// Bootstrap
log('Loading: Bootstrap sass');
import './assets/sass/styles.scss'; // eslint-disable-line import/first

// Firebase
log('Loading: Firebase');
import firebase from '@firebase/app'; // eslint-disable-line import/first
import '@firebase/auth'; // eslint-disable-line import/first
import '@firebase/firestore'; // eslint-disable-line import/first

log('Imported requirements');

// import * as DB from 'firebase/database';
// import * as Firestore from 'firebase/firestore';
// import * as Messaging from 'firebase/messaging';
// import * as Storage from 'firebase/storeage';

var config = {
        apiKey: firebaseAPIKey
        , authDomain: authDomain
        , databaseURL: databaseURL
        , projectId: firebaseProjectID
        , storageBucket: storageBucket
        , messagingSenderId: firebaseSenderID
    }
    , app = firebase.initializeApp(config);

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
        var promise = new Promise() < FirebaseUser > ((res, rej) => authEvent(res, (error) => rej(error)));
        log('promised...');
        this.observable = Observable.fromPromise(promise);
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
