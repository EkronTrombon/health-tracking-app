import type { IUserRepository } from "../interfaces/user.repository";
import type {
  UserProfile,
  UpdateProfileInput,
  WeightLogEntry,
  CreateWeightLogEntryInput,
} from "@/types/user.types";
import { generateId } from "@/lib/utils";

// Seed a default dev user so the app works immediately in dev mode
const DEV_USER: UserProfile = {
  id: "user_dev_1",
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  gender: "male",
  heightCm: 180,
  weightKg: 80,
  activityLevel: "moderately_active",
  fitnessGoal: "general_health",
  dailyCalorieGoal: 2200,
  proteinGoalGrams: 160,
  dietaryRestrictions: [],
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

export class InMemoryUserRepository implements IUserRepository {
  private users: UserProfile[] = [DEV_USER];
  private weightLogs: WeightLogEntry[] = [];

  async getById(id: string): Promise<UserProfile | null> {
    return this.users.find((u) => u.id === id) ?? null;
  }

  async getByEmail(email: string): Promise<UserProfile | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }

  async create(
    data: Omit<UserProfile, "createdAt" | "updatedAt">
  ): Promise<UserProfile> {
    const user: UserProfile = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async update(id: string, data: UpdateProfileInput): Promise<UserProfile> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error(`User ${id} not found`);

    const updated: UserProfile = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...this.users[index]!,
      ...data,
      updatedAt: new Date(),
    };
    this.users[index] = updated;
    return updated;
  }

  async getWeightLog(userId: string, limit = 30): Promise<WeightLogEntry[]> {
    return this.weightLogs
      .filter((e) => e.userId === userId)
      .sort((a, b) => b.loggedAt.getTime() - a.loggedAt.getTime())
      .slice(0, limit);
  }

  async addWeightEntry(
    userId: string,
    input: CreateWeightLogEntryInput
  ): Promise<WeightLogEntry> {
    const entry: WeightLogEntry = {
      id: generateId(),
      userId,
      weightKg: input.weightKg,
      note: input.note,
      loggedAt: new Date(),
    };
    this.weightLogs.push(entry);
    return entry;
  }
}
