/**
 * Auth facade — returns the current user's ID.
 *
 * v0.1–v0.5: Returns a hardcoded dev user ID so you can build and test
 *             every feature without auth complexity.
 *
 * v0.6: This function is replaced with a real Supabase Auth check.
 *
 * Every part of the app that needs the current user calls THIS function.
 * Swapping auth later means only changing this one file.
 */
export function getCurrentUserId(): string {
  return "user_dev_1";
}

/** Stub: in v0.6 this checks a real session. */
export function isAuthenticated(): boolean {
  return true;
}
