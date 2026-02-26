import type { IUserRepository } from "@/repositories/interfaces/user.repository";
import type {
  UserProfile,
  UpdateProfileInput,
  WeightLogEntry,
  CreateWeightLogEntryInput,
} from "@/types/user.types";

export class UserService {
  constructor(private readonly repo: IUserRepository) {}

  async getProfile(userId: string): Promise<UserProfile> {
    const user = await this.repo.getById(userId);
    if (!user) throw new Error(`User ${userId} not found`);
    return user;
  }

  async updateProfile(
    userId: string,
    data: UpdateProfileInput
  ): Promise<UserProfile> {
    return this.repo.update(userId, data);
  }

  async getWeightLog(userId: string, limit = 30): Promise<WeightLogEntry[]> {
    return this.repo.getWeightLog(userId, limit);
  }

  async logWeight(
    userId: string,
    input: CreateWeightLogEntryInput
  ): Promise<WeightLogEntry> {
    if (input.weightKg <= 0) {
      throw new Error("Weight must be greater than 0");
    }
    return this.repo.addWeightEntry(userId, input);
  }
}
