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
import * as firebase from 'firebase'; // eslint-disable-line
require('firebase/auth'); // eslint-disable-line import/first
require('firebase/firestore'); // eslint-disable-line import/first
require('firebase/database');
require('firebase/messageing');
require('firebase/storage');

const config = {
    apiKey: firebaseAPIKey
    , authDomain
    , databaseURL
    , messagingSenderId: firebaseSenderID
    , projectId: firebaseProjectID
    , storageBucket
};
firebase.initializeApp(config);
log('initializing');

export class AuthBridge {
    observable: Observable<FirebaseUser>;
    dispose: () => void;
    loginWithEmail: (email, password) => Promise<any>;
    logout: () => Promise<any>;
    constructor(authEvent: any) {
        const temp = firebase.auth().onAuthStateChanged;
        log('AuthBridge ctor');
        console.log(authEvent.name); // eslint-disable-line no-console
        var subject = new BehaviorSubject(firebase.auth().currentUser);
        temp((user: FirebaseUser) => subject.next(user), (err: FirebaseError) => subject.error(err));

        log('promised...');
        this.observable = subject.asObservable();
        // eslint-disable-next-line one-var
        var token = this.observable.subscribe((x) => authBoundCreators.changed(x),
            (err) => authBoundCreators.errord(err, 'login', 'subscribe'),
            () => this.dispose());
        log(`token: ${token}`);
        this.dispose = token.unsubscribe;
        this.loginWithEmail = firebase.auth().signInWithEmailAndPassword;
        this.logout = firebase.auth().signOut;
    }
}
// eslint-disable-next-line one-var
export const Bridge = new AuthBridge(firebase.auth().onAuthStateChanged);
