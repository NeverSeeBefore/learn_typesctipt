export interface IReducer<S, A> {
    (prevState: S, action: A): S
}