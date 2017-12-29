// @flow
export type DispatchAPI<A> = (action: A) => A;
export type Dispatch<A: { type: $Subtype<string> }> = DispatchAPI<A>;

// eslint-disable-next-line
export type MiddlewareAPI<S, A, D = Dispatch<A>> = {
  dispatch: D;
  getState(): S;
};
export type Reducer<S, A> = (state: S, action: A) => S;
export type Store<S, A, D = Dispatch<A>> = {
  dispatch: D;
  getState(): S;
  subscribe(listener: () => void): () => void;
  replaceReducer(nextReducer: Reducer<S, A>): void
};