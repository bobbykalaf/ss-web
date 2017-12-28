// @flow
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser, AuthError } from './authentication/types';

const firebaseAPIKey = "AIzaSyDITYME6eu54hUEwdg113HDxCXqZu6mJMo";
const firebaseProjectID = "smartspaces-c3f3b"
const firebaseSenderID = "507335541139";

const authDomain = `${firebaseProjectID}.firebaseapp.com`;
const databaseURL = `https://${firebaseProjectID}.firebaseio.com`;
const storageBucket = `${firebaseProjectID}.appspot.com`;

// Font Awesome
import './assets/fonts/svg-with-js/js/fontawesome-all.js';

// Bootstrap
import * as sass from "./assets/sass/styles.scss";

// Firebase
import firebase from '@firebase/app';
import '@firebase/auth';

// import * as DB from 'firebase/database';
// import * as Firestore from 'firebase/firestore';
// import * as Messaging from 'firebase/messaging';
// import * as Storage from 'firebase/storeage';

var config = {
    apiKey: "AIzaSyDITYME6eu54hUEwdg113HDxCXqZu6mJMo",
    authDomain: "smartspaces-c3f3b.firebaseapp.com",
    databaseURL: "https://smartspaces-c3f3b.firebaseio.com",
    projectId: "smartspaces-c3f3b",
    storageBucket: "smartspaces-c3f3b.appspot.com",
    messagingSenderId: "507335541139"
  };
firebase.initializeApp(config);

var auth: FirebaseAuth = firebase.auth();
var subject: BehaviorSubject<CurrentUser> = new BehaviorSubject(auth.currentUser);
var authSubscription = auth.onAuthStateChanged(subject.asObservable())

function onAuthChanged(user: CurrentUser): void {
  actionCreator.createAction(user);
}
function onAuthError(err: AuthError): void {
  actionCreator.createAction(err);
}

var promise = new Promise(auth.onAuthStateChanged);
var currentUserChange = Observable.fromPromise(promise).do(actionCreator.createAction);

const appToSubjectSubscription = subject.subscribe(onAuthChanged, onAuthError, authSubscription);
subject.switch
const getCurrentUser = () => auth.currentUser;