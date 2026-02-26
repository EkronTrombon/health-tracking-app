import type { IWorkoutRepository } from "@/repositories/interfaces/workout.repository";
import type {
  WorkoutSession,
  CreateWorkoutSessionInput,
  LogExerciseSetInput,
} from "@/types/workout.types";

export class WorkoutService {
  constructor(private readonly repo: IWorkoutRepository) {}

  async startSession(
    userId: string,
    input: CreateWorkoutSessionInput
  ): Promise<WorkoutSession> {
    return this.repo.createSession(userId, input);
  }

  async addSet(
    sessionId: string,
    input: LogExerciseSetInput
  ): Promise<WorkoutSession> {
    return this.repo.addSetToSession(sessionId, input);
  }

  async finishSession(
    sessionId: string,
    startedAt: Date
  ): Promise<WorkoutSession> {
    const durationMinutes = Math.round(
      (Date.now() - startedAt.getTime()) / 60000
    );
    return this.repo.completeSession(sessionId, durationMinutes);
  }

  async getRecentWorkouts(
    userId: string,
    limit = 10
  ): Promise<WorkoutSession[]> {
    return this.repo.getSessionsForUser(userId, limit);
  }

  async getWorkoutById(id: string): Promise<WorkoutSession | null> {
    return this.repo.getSessionById(id);
  }

  async getWorkoutsForDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<WorkoutSession[]> {
    return this.repo.getSessionsForDateRange(userId, startDate, endDate);
  }

  async deleteWorkout(id: string): Promise<void> {
    return this.repo.deleteSession(id);
  }
}
