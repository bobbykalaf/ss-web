// @flow
import { LoginExceptionConstructor, LogoutExceptionConstructor, UnknownContextConstructor } from './exception';

/* eslint-disable import/unambiguous */
const now = 1234567890;
Date.now = jest.fn().mockReturnValue(now);
var origStack = Error.prepareStackTrace;
Error.prepareStackTrace = jest.fn().mockReturnValue('Some stacktrace!');

const outcome = LoginExceptionConstructor(new Error('test error #1'));
const outcome2 = LogoutExceptionConstructor(new Error('test error #2'));
const outcome3 = UnknownContextConstructor(new Error('test error #3'));
outcome.exception.stack; // eslint-disable-line no-unused-expressions
outcome2.exception.stack; // eslint-disable-line no-unused-expressions
outcome3.exception.stack; // eslint-disable-line no-unused-expressions

test('Exception creator: test #1a', () =>
    expect(typeof outcome === 'object' && !(outcome instanceof Array)).toBeTruthy());
test('Exception creator: test #1b', () => expect(Object.keys(outcome)).toContain('context'));
test('Exception creator: test #1c', () =>
    expect(typeof outcome.context === 'object' && !(outcome.context instanceof Array)).toBeTruthy());
test('Exception creator: test #1d', () => expect(Object.keys(outcome.context)).toContain('authPhase'));
test('Exception creator: test #1e', () => expect(outcome.context.authPhase).toEqual('login'));
test('Exception creator: test #1f', () => expect(Object.keys(outcome.context)).toContain('timestamp'));
test('Exception creator: test #1g', () => expect(outcome.context.timestamp).toEqual(1234567890)); // eslint-disable-line no-magic-numbers
test('Exception creator: test #1h', () => expect(Object.keys(outcome)).toContain('exception'));
test('Exception creator: test #1i', () =>
    expect(typeof outcome.exception === 'object' && !(outcome.exception instanceof Array)).toBeTruthy());
test('Exception creator: test #1j [message]', () =>
    expect(Object.getOwnPropertyNames(outcome.exception)).toContain('message'));
test('Exception creator: test #1k', () => expect(outcome.exception.message).toEqual('test error #1'));
test('Exception creator: test #1l [stack]', () =>
    expect(Object.getOwnPropertyNames(outcome.exception)).toContain('stack'));
test('Exception creator: test #1m', () => expect(outcome.exception.stack).toEqual('Some stacktrace!'));

// test 2)

test('Exception creator: test #2a', () =>
    expect(typeof outcome2 === 'object' && !(outcome2 instanceof Array)).toBeTruthy());
test('Exception creator: test #2b', () => expect(Object.keys(outcome2)).toContain('context'));
test('Exception creator: test #2c', () =>
    expect(typeof outcome2.context === 'object' && !(outcome2.context instanceof Array)).toBeTruthy());
test('Exception creator: test #2d', () => expect(Object.keys(outcome2.context)).toContain('authPhase'));
test('Exception creator: test #2e', () => expect(outcome2.context.authPhase).toEqual('logout'));
test('Exception creator: test #2f', () => expect(Object.keys(outcome2.context)).toContain('timestamp'));
test('Exception creator: test #2g', () => expect(outcome2.context.timestamp).toEqual(1234567890)); // eslint-disable-line no-magic-numbers
test('Exception creator: test #2h', () => expect(Object.keys(outcome2)).toContain('exception'));
test('Exception creator: test #2i', () =>
    expect(typeof outcome2.exception === 'object' && !(outcome2.exception instanceof Array)).toBeTruthy());
test('Exception creator: test #2j [message]', () =>
    expect(Object.getOwnPropertyNames(outcome2.exception)).toContain('message'));
test('Exception creator: test #2k', () => expect(outcome2.exception.message).toEqual('test error #2'));
test('Exception creator: test #2l [stack]', () =>
    expect(Object.getOwnPropertyNames(outcome2.exception)).toContain('stack'));
test('Exception creator: test #2m', () => expect(outcome2.exception.stack).toEqual('Some stacktrace!'));

// test 3)

test('Exception creator: test #3a', () =>
    expect(typeof outcome3 === 'object' && !(outcome3 instanceof Array)).toBeTruthy());
test('Exception creator: test #3b', () => expect(Object.keys(outcome3)).toContain('context'));
test('Exception creator: test #3c', () =>
    expect(typeof outcome3.context === 'object' && !(outcome3.context instanceof Array)).toBeTruthy());
test('Exception creator: test #3d', () => expect(Object.keys(outcome3.context)).toContain('authPhase'));
test('Exception creator: test #3e [authPhase]', () => expect(outcome3.context.authPhase).toBeUndefined());
test('Exception creator: test #3f', () => expect(Object.keys(outcome3.context)).toContain('timestamp'));
test('Exception creator: test #3g', () => expect(outcome3.context.timestamp).toEqual(1234567890)); // eslint-disable-line no-magic-numbers
test('Exception creator: test #3h', () => expect(Object.keys(outcome3)).toContain('exception'));
test('Exception creator: test #3i', () =>
    expect(typeof outcome3.exception === 'object' && !(outcome3.exception instanceof Array)).toBeTruthy());
test('Exception creator: test #3j [message property]', () =>
    expect(Object.getOwnPropertyNames(outcome3.exception)).toContain('message'));
test('Descriptors', () => expect(Object.getOwnPropertyNames(outcome3.exception)).toContain('message'));
test('Exception creator: test #3k [message]', () => expect(outcome3.exception.message).toEqual('test error #3'));
test('Exception creator: test #3l [stack property]', () =>
    expect(Object.getOwnPropertyNames(outcome3.exception)).toContain('stack'));
test('Exception creator: test #3m', () => expect(outcome3.exception.stack).toEqual('Some stacktrace!'));

Error.prepareStackTrace = origStack;
