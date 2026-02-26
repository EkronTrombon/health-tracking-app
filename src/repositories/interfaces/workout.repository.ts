import type {
  WorkoutSession,
  CreateWorkoutSessionInput,
  LogExerciseSetInput,
} from "@/types/workout.types";

export interface IWorkoutRepository {
  getSessionById(id: string): Promise<WorkoutSession | null>;
  getSessionsForUser(userId: string, limit?: number): Promise<WorkoutSession[]>;
  getSessionsForDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<WorkoutSession[]>;
  createSession(
    userId: string,
    input: CreateWorkoutSessionInput
  ): Promise<WorkoutSession>;
  addSetToSession(
    sessionId: string,
    input: LogExerciseSetInput
  ): Promise<WorkoutSession>;
  completeSession(
    sessionId: string,
    durationMinutes: number
  ): Promise<WorkoutSession>;
  deleteSession(id: string): Promise<void>;
}
