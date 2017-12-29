// flow-typed signature: e43f9d36b48a9b34456945390468d800
// flow-typed version: <<STUB>>/ss-common_v0.1.2/flow_v0.61.0

/**
 * This is an autogenerated libdef stub for:
 *
 *   'ss-common'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */
declare type Transform<T, U> = (t: T) => U;

  
declare module 'ss-common' {
	declare type Nullable<T> = T | void;
	declare function pipeLeft<T, U>(f1: (vT: T) => U): (x: T) => U;
  declare function mergeRight<T, U, V>(f1: (vT: T) => U): (f2: (vU: U) => V) => Transform<T, V>;
	declare function mergeLeft<T, U, V>(f2: (vU: U) => V): (f1: (vT: T) => U) => (t: T) => V;
	declare function pipeRight<T, U>(x: T): (f1: (vT: T) => U) => U;
  
  declare function pipeReverse<T, U>(f1: (vT: T) => U): (x: T) => U;
  declare function composeForward<T, U, V>(f1: (vT: T) => U): (f2: (vU: U) => V) => Transform<T, V>;
	declare function composeReverse<T, U, V>(f2: (vU: U) => V): (f1: (vT: T) => U) => (t: T) => V;
  declare function pipeForward<T, U>(x: T): (f1: (vT: T) => U) => U;
  
	declare module.exports: {};
}

/**
 * We include stubs for each file inside this npm package in case you need to
 * require those files directly. Feel free to delete any files that aren't
 * needed.
 */

declare module 'ss-common/src/decorators/decorators' {
	declare module.exports: any;
}

declare module 'ss-common/src/index' {
  declare type Nullable<T> = T | void;
	declare function pipeLeft<T, U>(f1: (vT: T) => U): (x: T) => U;
  declare function mergeRight<T, U, V>(f1: (vT: T) => U): (f2: (vU: U) => V) => (t: T) => V;
	declare function mergeLeft<T, U, V>(f2: (vU: U) => V): (f1: (vT: T) => U) => (t: T) => V;
	declare function pipeRight<T, U>(x: T): (f1: (vT: T) => U) => U;
  
  declare function pipeReverse<T, U>(f1: (vT: T) => U): (x: T) => U;
  declare function composeForward<T, U, V>(f1: (vT: T) => U): (f2: (vU: U) => V) => Transform<T, V>;
	declare function composeReverse<T, U, V>(f2: (vU: U) => V): (f1: (vT: T) => U) => (t: T) => V;
  declare function pipeForward<T, U>(x: T): (f1: (vT: T) => U) => U;
  
	declare module.exports: any;
}

declare module 'ss-common/src/list/index' {
	declare type Nullable<T> = T | void;
  declare function filterNullEmpty(list: Nullable<string>[]): string[];
	declare module.exports: any;
}

declare module 'ss-common/src/text/index' {
  declare function isEmpty(str?: string): boolean;
  declare function isNotEmpty(str?: string): boolean;
  declare function isNotNullOrEmpty(str?: string): boolean;
  declare function capitalize(str?: string): string;
	declare module.exports: {};
}

// Filename aliases

declare module 'ss-common/src/decorators/decorators.js' {
	declare module.exports: $Exports<'ss-common/src/decorators/decorators'>;
}

declare module 'ss-common/src/index.js' {
	declare module.exports: $Exports<'ss-common/src/index'>;
}

declare module 'ss-common/src/list/index.js' {
	declare module.exports: $Exports<'ss-common/src/list/index'>;
}

declare module 'ss-common/src/text/index.js' {
	declare module.exports: $Exports<'ss-common/src/text/index'>;
}
