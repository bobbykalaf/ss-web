// @flow
/* eslint-disable no-magic-numbers */
/* eslint-disable no-underscore-dangle */
import { Observable } from '@reactivex/rxjs';
import State from './state';

var x = State.idleFetchingStatus();
test('idle', () => expect(typeof x === 'object' && !(x instanceof Array)).toBeTruthy());

// const test2setup = (outcome: Fetching) => {
//     expect(typeof outcome === 'object' && !(outcome instanceof Array)).toBeTruthy();
//     expect(Object.keys(outcome)).toContain('context');
//     toEqual(outcome.context, 'login');

//     expect(Object.keys(outcome)).toContain('observable');
//     expect(typeof outcome.observable === 'object' && !(outcome.observable instanceof Array)).toBeTruthy();
//     if (outcome.observable === undefined || outcome.observable === null) {
//         throw new Error('Null');
//     }
//     var scalar = outcome.observable._isScalar;
//     expect(Object.keys(outcome.observable)).toContain('_isScalar');
//     expect(outcome.observable._isScalar).toBe(true);
//     toBe(scalar, true);
//     expect(Object.keys(outcome.observable)).toContain('array');
//     expect(outcome.observable.array instanceof Array).toBeTruthy();
//     expect(outcome.observable.array.length).toEqual(1);
//     expect(outcome.observable.array[0]).toEqual(1);

//     expect(Object.keys(outcome.observable)).toContain('scheduler');
//     expect(outcome.observable.scheduler).toBeUndefined();

//     expect(Object.keys(outcome.observable)).toContain('value');
//     expect(outcome.observable.value).toEqual(1);
// };

// const test3setup = (outcome) => {
//     expect(typeof outcome === 'object' && !(outcome instanceof Array)).toBeTruthy();
//     expect(Object.keys(outcome)).toContain('context');
//     expect(outcome.context).toEqual('logout');

//     expect(Object.keys(outcome)).toContain('observable');
//     expect(typeof outcome.observable === 'object' && !(outcome.observable instanceof Array)).toBeTruthy();
//     expect(Object.keys(outcome.observable)).toContain('_isScalar');
//     expect(outcome.observable._isScalar).toBe(true);

//     expect(Object.keys(outcome.observable)).toContain('array');
//     expect(outcome.observable.array instanceof Array).toBeTruthy();
//     expect(outcome.observable.array.length).toEqual(1);
//     expect(outcome.observable.array[0]).toEqual(1);

//     expect(Object.keys(outcome.observable)).toContain('scheduler');
//     expect(outcome.observable.scheduler).toBeUndefined();

//     expect(Object.keys(outcome.observable)).toContain('value');
//     expect(outcome.observable.value).toEqual(1);
// };

var outcome2 = State.loginFetchingStatus(Observable.from([ 1 ])); // eslint-disable-line no-magic-numbers
test('fetching login', () => expect(outcome2).toMatchSnapshot());
// test('fetching2', () => test2setup(outcome2));
var outcome3 = State.logoutFetchingStatus(Observable.from([ 1 ])); // eslint-disable-line no-magic-numbers
console.log(outcome3); // eslint-disable-line
test('fetching logout', () => expect(outcome3).toMatchSnapshot());
// test('fetching3', () => test3setup(outcome3));
