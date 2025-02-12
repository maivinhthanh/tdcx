import React from "react";

const CounterDisplay = React.memo(({ count }: { count: number }) => {
  return <p className="text-3xl font-semibold my-4">{count}</p>;
});

export default CounterDisplay;
