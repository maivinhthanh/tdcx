import { useMemo } from "react";

interface CounterActionsProps {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export default function CounterActions({ increment, decrement, reset }: CounterActionsProps) {

  const actionButtons = useMemo(
    () => [
      { label: "Increment", onClick: increment, style: "bg-blue-500" },
      { label: "Decrement", onClick: decrement, style: "bg-red-500" }
    ],
    [increment, decrement]
  );

  return (
    <div className="text-center">
      <div className="flex gap-2 justify-center">
        {actionButtons.map(({ label, onClick, style }) => (
          <button key={label} className={`px-4 py-2 ${style} text-white rounded`} onClick={onClick}>
            {label}
          </button>
        ))}
      </div>
      <button className="mt-4 px-6 py-2 bg-gray-500 text-white rounded" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
