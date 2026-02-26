import type {
  UserProfile,
  UpdateProfileInput,
  WeightLogEntry,
  CreateWeightLogEntryInput,
} from "@/types/user.types";

export interface IUserRepository {
  getById(id: string): Promise<UserProfile | null>;
  getByEmail(email: string): Promise<UserProfile | null>;
  create(data: Omit<UserProfile, "createdAt" | "updatedAt">): Promise<UserProfile>;
  update(id: string, data: UpdateProfileInput): Promise<UserProfile>;

  // Weight log
  getWeightLog(userId: string, limit?: number): Promise<WeightLogEntry[]>;
  addWeightEntry(
    userId: string,
    input: CreateWeightLogEntryInput
  ): Promise<WeightLogEntry>;
}
