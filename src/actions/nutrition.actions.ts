"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { nutritionService } from "@/lib/di";
import { getCurrentUserId } from "@/lib/auth";
import { LogMealSchema, type LogMealInput } from "@/types/nutrition.types";

export type ActionResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Log a meal entry.
 * Called from LogMealForm (client component) after client-side RHF validation.
 * Re-validates on the server with Zod before persisting.
 */
export async function logMealAction(data: LogMealInput): Promise<void> {
  const parsed = LogMealSchema.safeParse(data);
  if (!parsed.success) {
    // Should not normally reach here — client already validated with same schema
    throw new Error("Invalid meal data: " + parsed.error.message);
  }

  const userId = getCurrentUserId();
  await nutritionService.logMeal(userId, parsed.data);

  revalidatePath("/nutrition");
  revalidatePath("/dashboard");
  redirect("/nutrition");
}

/**
 * Delete a food log entry.
 * Called from FoodLogList's useOptimistic delete handler.
 */
export async function deleteMealEntryAction(entryId: string): Promise<ActionResult> {
  try {
    await nutritionService.deleteMealEntry(entryId);
    revalidatePath("/nutrition");
    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete entry" };
  }
}
