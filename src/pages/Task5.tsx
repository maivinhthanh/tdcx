import useCounter from "src/hooks/useCounter";
import CounterDisplay from "src/components/Counter/CounterDisplay";
import CounterActions from "src/components/Counter/CounterActions";

export default function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="max-w-xs mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold">Counter</h2>
      <CounterDisplay count={count} />
      <CounterActions
        increment={increment}
        decrement={decrement}
        reset={reset}
      />
    </div>
  );
}
