import type { Metadata } from "next";
import { Utensils, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { nutritionService, userService } from "@/lib/di";
import { getCurrentUserId } from "@/lib/auth";
import { DateNav } from "@/components/nutrition/date-nav";
import { MacroSummary } from "@/components/nutrition/macro-summary";
import { FoodLogList } from "@/components/nutrition/food-log-list";

export const metadata: Metadata = { title: "Nutrition" };

interface NutritionPageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function NutritionPage({ searchParams }: NutritionPageProps) {
  const { date: dateParam } = await searchParams;

  // Parse date from URL or default to today
  const date = dateParam ? new Date(dateParam) : new Date();
  // Guard against invalid dates
  const resolvedDate = isNaN(date.getTime()) ? new Date() : date;

  const userId = getCurrentUserId();

  // Fetch summary + profile in parallel
  const [summary, profile] = await Promise.all([
    nutritionService.getDailyNutritionSummary(userId, resolvedDate),
    userService.getProfile(userId),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Utensils className="w-6 h-6 text-(--nutrition)" />
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

      <DateNav date={resolvedDate} />

      <div className="mt-4 space-y-4">
        <MacroSummary totals={summary.totals} profile={profile} />
        <FoodLogList byMealType={summary.byMealType} />
      </div>
    </div>
  );
}
