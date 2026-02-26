import type { IWorkoutRepository } from "../interfaces/workout.repository";
import type {
  WorkoutSession,
  CreateWorkoutSessionInput,
  LogExerciseSetInput,
  ExerciseSet,
} from "@/types/workout.types";
import { generateId } from "@/lib/utils";

export class InMemoryWorkoutRepository implements IWorkoutRepository {
  private sessions: WorkoutSession[] = [];

  async getSessionById(id: string): Promise<WorkoutSession | null> {
    return this.sessions.find((s) => s.id === id) ?? null;
  }

  async getSessionsForUser(
    userId: string,
    limit = 20
  ): Promise<WorkoutSession[]> {
    return this.sessions
      .filter((s) => s.userId === userId)
      .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())
      .slice(0, limit);
  }

  async getSessionsForDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<WorkoutSession[]> {
    return this.sessions
      .filter(
        (s) =>
          s.userId === userId &&
          s.startedAt >= startDate &&
          s.startedAt <= endDate
      )
      .sort((a, b) => a.startedAt.getTime() - b.startedAt.getTime());
  }

  async createSession(
    userId: string,
    input: CreateWorkoutSessionInput
  ): Promise<WorkoutSession> {
    const session: WorkoutSession = {
      id: generateId(),
      userId,
      name: input.name,
      note: input.note,
      sets: [],
      startedAt: new Date(),
    };
    this.sessions.push(session);
    return session;
  }

  async addSetToSession(
    sessionId: string,
    input: LogExerciseSetInput
  ): Promise<WorkoutSession> {
    const session = this.sessions.find((s) => s.id === sessionId);
    if (!session) throw new Error(`Workout session ${sessionId} not found`);

    const set: ExerciseSet = {
      id: generateId(),
      exerciseId: input.exerciseId,
      exerciseName: input.exerciseName,
      setNumber: input.setNumber,
      reps: input.reps,
      weightKg: input.weightKg,
      durationSeconds: input.durationSeconds,
      rpe: input.rpe,
      note: input.note,
      completedAt: new Date(),
    };

    session.sets.push(set);
    return session;
  }

  async completeSession(
    sessionId: string,
    durationMinutes: number
  ): Promise<WorkoutSession> {
    const session = this.sessions.find((s) => s.id === sessionId);
    if (!session) throw new Error(`Workout session ${sessionId} not found`);

    session.completedAt = new Date();
    session.durationMinutes = durationMinutes;
    return session;
  }

  async deleteSession(id: string): Promise<void> {
    this.sessions = this.sessions.filter((s) => s.id !== id);
  }
}
