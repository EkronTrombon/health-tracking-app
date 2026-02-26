import type { WeightLogEntry } from "@/types/user.types";

export interface WeightTrend {
  startWeight: number;
  currentWeight: number;
  changeKg: number;
  entries: WeightLogEntry[];
}

export interface IProgressRepository {
  getWeightTrend(userId: string, days: number): Promise<WeightTrend>;
  getWorkoutStreak(userId: string): Promise<number>;
  getTotalWorkoutMinutes(userId: string, days: number): Promise<number>;
}
