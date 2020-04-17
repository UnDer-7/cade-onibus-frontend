export type Consumer<T> = (t: T) => void;
export type BiConsumer<T, U> = (t: T, u: U) => void;

export type Function<T, R> = (t: T) => R;
export type BiFunction<T, U, R> = (t: T, u: U) => R;

export type UnaryOperator<T> = Function<T, T>;

export type Predicate<T> = (t: T) => boolean;
export type BiPredicate<T, U> = (t: T, u: U) => boolean;

export type Supplier<T> = () => T;
