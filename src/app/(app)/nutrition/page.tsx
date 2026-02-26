import type { Metadata } from "next";
import { Utensils, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = { title: "Nutrition" };

export default function NutritionPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Utensils className="w-6 h-6 text-[var(--nutrition)]" />
            Nutrition
          </h2>
          <p className="text-muted-foreground mt-1">Track your meals and macros.</p>
        </div>
        <Button asChild>
          <Link href="/nutrition/log">
            <Plus className="w-4 h-4 mr-2" />
            Log Meal
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <Utensils className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
        <h3 className="font-semibold text-lg mb-1">Nutrition tracking coming in v0.2</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Log meals, track macros (calories, protein, carbs, fat), and view your daily nutrition summary.
        </p>
      </div>
    </div>
  );
}
