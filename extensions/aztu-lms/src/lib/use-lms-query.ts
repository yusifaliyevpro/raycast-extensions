import { showFailureToast, useCachedPromise } from "@raycast/utils";

/**
 * Thin wrapper around `useCachedPromise` that standardizes how every LMS screen
 * fetches data: cached results (instant render from the last successful fetch),
 * `null` as the initial value, and a single failure toast on error.
 *
 * The failure toast title is derived from the data function's name (e.g.
 * `getLectures` → "Failed to getLectures"), so call sites stay free of repeated
 * error strings.
 *
 * Because the data layer (`apiGet`) throws on failure, `useCachedPromise` records
 * the error and keeps the previously cached data instead of blanking the screen.
 * The returned `revalidate` powers a manual refresh action (⌘R).
 */
export function useLmsQuery<T, A extends unknown[]>(fn: (...args: A) => Promise<T>, args: A) {
  return useCachedPromise(fn, args, {
    initialData: null,
    onError: (error) => {
      showFailureToast(error, { title: `Failed to ${fn.name}` });
    },
  });
}
