import { redirect } from "next/navigation";

// Root page redirects to dashboard (in dev mode, auth is stubbed)
// At v0.6, this will check the session and redirect to /login if not authenticated
export default function RootPage() {
  redirect("/dashboard");
}
