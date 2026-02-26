import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Sign in</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your credentials to access your account.
          </p>
        </div>

        <div className="rounded-lg bg-muted/50 border p-4 text-sm text-muted-foreground text-center">
          Authentication form will be built in v0.6 (Supabase Auth).
        </div>
      </div>
    </div>
  );
}
