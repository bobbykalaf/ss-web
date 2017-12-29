// @flow
import { BehaviorSubject, Observable } from 'rxjs';
import { type FirebaseError, type FirebaseUser } from './authentication/types';
import { authBoundCreators } from './store';
import { log } from './index';

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
import firebase from 'firebase/app'; // eslint-disable-line
import 'firebase/auth'; // eslint-disable-line import/first
import 'firebase/firestore'; // eslint-disable-line import/first

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

export class AuthBridge {
    observable: Observable<FirebaseUser>;
    dispose: () => void;
    loginWithEmail: (email, password) => Promise<any>;
    logout: () => Promise<any>;
    constructor(authEvent: any) {
        log('AuthBridge ctor');
        console.log(authEvent.name); // eslint-disable-line no-console
        var subject = new BehaviorSubject(app.auth().currentUser);
        authEvent((user: FirebaseUser) => subject.next(user), (err: FirebaseError) => subject.error(err));

        log('promised...');
        this.observable = subject.asObservable();
        // eslint-disable-next-line one-var
        var token = this.observable.subscribe((x) => authBoundCreators.changed(x),
            (err) => authBoundCreators.errord(err, 'login', 'subscribe'),
            () => this.dispose());
        log(`token: ${token}`);
        this.dispose = token.unsubscribe;
        this.loginWithEmail = app.auth().signInWithEmailAndPassword;
        this.logout = app.auth().signOut;
    }
}
// eslint-disable-next-line one-var
export const Bridge = new AuthBridge(app.auth().onAuthStateChanged);
