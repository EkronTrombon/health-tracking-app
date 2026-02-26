import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogMealForm } from "@/components/nutrition/log-meal-form";
import type { MealType } from "@/types/nutrition.types";

export const metadata: Metadata = { title: "Log Meal" };

const VALID_MEAL_TYPES: MealType[] = ["breakfast", "lunch", "dinner", "snack"];

interface LogMealPageProps {
  searchParams: Promise<{ meal?: string }>;
}

export default async function LogMealPage({ searchParams }: LogMealPageProps) {
  const { meal } = await searchParams;
  const mealType: MealType = VALID_MEAL_TYPES.includes(meal as MealType)
    ? (meal as MealType)
    : "snack";

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link href="/nutrition">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Log a Meal</h2>
          <p className="text-muted-foreground mt-0.5">Search and log what you ate.</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <LogMealForm defaultMealType={mealType} />
      </div>
    </div>
  );
}
