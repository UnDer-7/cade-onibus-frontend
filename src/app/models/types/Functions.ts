export type Consumer<Param> = (t: Param) => void;
export type BiConsumer<ParamA, ParamB> = (t: ParamA, u: ParamB) => void;

export type Function<Param, Return> = (t: Param) => Return;
export type BiFunction<ParamA, ParamB, Return> = (t: ParamA, u: ParamB) => Return;

export type UnaryOperator<ParamReturn> = Function<ParamReturn, ParamReturn>;

export type Predicate<Param> = (t: Param) => boolean;
export type BiPredicate<ParamA, ParamB> = (t: ParamA, u: ParamB) => boolean;

export type Supplier<Return> = () => Return;
export type Runnable = () => void;


// Dummy functions to use as fallBack
// eslint-disable-next-line no-unused-vars
export const ConsumerImpl: Consumer<any> = (_) => {};
export const RunnableImpl: Runnable = () => {};
