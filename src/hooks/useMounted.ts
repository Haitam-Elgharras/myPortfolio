import { useSyncExternalStore } from "react";

// Nothing to subscribe to — the value flips once, when React hydrates.
const subscribe = () => () => {};

/**
 * Returns false on the server and during hydration, then true.
 *
 * Use it to gate anything whose value can only be known in the browser
 * (`prefers-reduced-motion`, viewport size). `useSyncExternalStore` is the
 * right primitive here because it takes a separate server snapshot, so the
 * hydrating render provably matches the prerendered HTML.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
