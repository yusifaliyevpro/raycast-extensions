import { environment } from "@raycast/api";
import { authedFetch } from "./auth";
import { green, red } from "./utils";

/**
 * GET a JSON resource. Throws on any network/parse error or non-OK response so the
 * caller's data hook (`useCachedPromise`/`usePromise`) records an error and keeps the
 * previously cached data instead of overwriting it with `null`.
 *
 * Pass `select` to validate/transform the raw payload — return a fallback (e.g. `null`)
 * for structurally invalid data without throwing.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiGet<T>(path: string, select?: (data: any) => T): Promise<T> {
  try {
    const res = await authedFetch(path, { method: "GET" });
    if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
    const data = await res.json();
    if (environment.isDevelopment) console.log(green(`GET ${path} → ${res.status}`));
    return select ? select(data) : (data as T);
  } catch (error) {
    if (environment.isDevelopment) console.error(red(`apiGet ${path} failed:`), error);
    throw error;
  }
}

/** GET a binary resource (e.g. a secure file download). Returns `null` on failure. */
export async function apiGetBytes(path: string): Promise<Uint8Array | null> {
  try {
    const res = await authedFetch(path, { method: "GET" });
    if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
    if (environment.isDevelopment) console.log(green(`GET ${path} → ${res.status}`));
    return new Uint8Array(await res.arrayBuffer());
  } catch (error) {
    if (environment.isDevelopment) console.error(red(`apiGetBytes ${path} failed:`), error);
    return null;
  }
}
