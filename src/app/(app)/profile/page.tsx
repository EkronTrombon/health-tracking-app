import type { Metadata } from "next";
import { User } from "lucide-react";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <User className="w-6 h-6" />
          Profile
        </h2>
        <p className="text-muted-foreground mt-1">
          Your personal data, goals, and preferences.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <User className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
        <h3 className="font-semibold text-lg mb-1">Profile management coming in v0.6</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Set your height, weight, age, activity level, dietary goals, and fitness targets.
        </p>
      </div>
    </div>
  );
}
