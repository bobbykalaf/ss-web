import {idleFetchingStatus} from './state';
// @flow
function unitTest(func: Function, expected: any, propertyName: string, ...args?: any[]) {
    var testTitle = `TestOf: ${func.name} w/ inputs: ${JSON.stringify(args)}\n\tcriteria: ${propertyName}::${expected.toString()}`;
    test(testTitle, () => Object.getOwnPropertyDescriptor(expect(func(...args)), propertyName).value(expected));
}

unitTest(idleFetchingStatus, {}, 'toMatchObject');

{
    context: 'login',
    observable: {"_isScalar":true,"array":[true],"value":true}
}

unitTest(loginFetchingStatus, Observable.from([ true ]))
unitTest(logoutFetchingStatus, Observable.from([ true ]))

expect(typeof outcome === "object" && !(outcome instanceof Array)).toBeTruthy();
expect(Object.keys(outcome)).toContain("context");
expect(outcome.context).toEqual("login");

expect(Object.keys(outcome)).toContain("observable");
expect(typeof outcome.observable === "object" && !(outcome.observable instanceof Array)).toBeTruthy();
expect(Object.keys(outcome.observable)).toContain("_isScalar");
expect(outcome.observable._isScalar).toBe(true);

expect(Object.keys(outcome.observable)).toContain("array");
expect(outcome.observable.array instanceof Array).toBeTruthy();
expect(outcome.observable.array.length).toEqual(1);
expect(outcome.observable.array[0]).toBe(true);

expect(Object.keys(outcome.observable)).toContain("value");
expect(outcome.observable.value).toBe(true);
