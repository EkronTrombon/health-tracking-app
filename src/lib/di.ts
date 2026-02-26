/**
 * Dependency Injection wiring.
 *
 * This is THE ONLY FILE that changes when swapping the database at v0.6.
 * Services never import repository implementations directly — they only
 * depend on the interfaces. This file wires concrete implementations in.
 *
 * To swap to Supabase at v0.6:
 *   1. Create src/repositories/supabase/*.repository.ts
 *   2. Comment out the InMemory imports below
 *   3. Import and instantiate the Supabase repositories instead
 *   4. The services below need ZERO changes.
 */

import { InMemoryUserRepository } from "@/repositories/in-memory/user.repository";
import { InMemoryNutritionRepository } from "@/repositories/in-memory/nutrition.repository";
import { InMemoryWorkoutRepository } from "@/repositories/in-memory/workout.repository";

import { UserService } from "@/services/user.service";
import { NutritionService } from "@/services/nutrition.service";
import { WorkoutService } from "@/services/workout.service";

// ─── Repository instances (singletons via module caching) ─────────────────────
// Next.js module system caches these per server process restart.
// In-memory data persists across requests but resets on server restart.

const userRepo = new InMemoryUserRepository();
const nutritionRepo = new InMemoryNutritionRepository();
const workoutRepo = new InMemoryWorkoutRepository();

// ─── Service instances ────────────────────────────────────────────────────────
// Services are injected with their repository. No service knows about a
// concrete database — they only talk to the repository interface.

export const userService = new UserService(userRepo);
export const nutritionService = new NutritionService(nutritionRepo);
export const workoutService = new WorkoutService(workoutRepo);
