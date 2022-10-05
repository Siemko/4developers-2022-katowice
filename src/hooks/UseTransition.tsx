import * as React from "react";

export function UseTransition() {
  const [value, setValue] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  return (
    <div>
      <input
        onChange={(e) => startTransition(() => setValue(e.target.value))}
      />
      {isPending ? "..." : null}
      <div>
        {value ? Array(10000)
          .fill(undefined)
          .map((_, i) => (
            <div key={i}>{value}</div>
          )) : null}
      </div>
    </div>
  );
}
