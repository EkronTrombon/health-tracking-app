import type { Metadata } from "next";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Create account</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Sign up to start tracking your health journey.
          </p>
        </div>

        <div className="rounded-lg bg-muted/50 border p-4 text-sm text-muted-foreground text-center">
          Registration form will be built in v0.6 (Supabase Auth).
        </div>
      </div>
    </div>
  );
}
