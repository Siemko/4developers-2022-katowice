import * as React from "react";

function subscribe(callback: (this: Window, ev: Event) => any) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export function UseSyncExternalStorage() {
  const isOnline = React.useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  );

  return <div>{isOnline ? "Online" : "Offline"}</div>;
}
