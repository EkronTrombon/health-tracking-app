export interface ExerciseItem {
  id: string;
  name: string;
  category: "strength" | "cardio" | "core" | "flexibility";
  primaryMuscles: string[];
  defaultReps?: number;
  defaultWeightKg?: number;
  defaultDurationSeconds?: number;
  isCardio: boolean;
}

export const EXERCISES: ExerciseItem[] = [
  // ─── Chest ────────────────────────────────────────────────────────────────
  {
    id: "barbell-bench-press",
    name: "Barbell Bench Press",
    category: "strength",
    primaryMuscles: ["chest", "shoulders", "triceps"],
    defaultReps: 8,
    defaultWeightKg: 60,
    isCardio: false,
  },
  {
    id: "dumbbell-bench-press",
    name: "Dumbbell Bench Press",
    category: "strength",
    primaryMuscles: ["chest", "shoulders", "triceps"],
    defaultReps: 10,
    defaultWeightKg: 22,
    isCardio: false,
  },
  {
    id: "incline-bench-press",
    name: "Incline Bench Press",
    category: "strength",
    primaryMuscles: ["chest", "shoulders"],
    defaultReps: 8,
    defaultWeightKg: 50,
    isCardio: false,
  },
  {
    id: "push-up",
    name: "Push-Up",
    category: "strength",
    primaryMuscles: ["chest", "triceps", "shoulders"],
    defaultReps: 15,
    isCardio: false,
  },
  {
    id: "cable-fly",
    name: "Cable Fly",
    category: "strength",
    primaryMuscles: ["chest"],
    defaultReps: 12,
    defaultWeightKg: 15,
    isCardio: false,
  },

  // ─── Back ─────────────────────────────────────────────────────────────────
  {
    id: "pull-up",
    name: "Pull-Up",
    category: "strength",
    primaryMuscles: ["back", "biceps"],
    defaultReps: 8,
    isCardio: false,
  },
  {
    id: "barbell-row",
    name: "Barbell Row",
    category: "strength",
    primaryMuscles: ["back", "biceps"],
    defaultReps: 8,
    defaultWeightKg: 60,
    isCardio: false,
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    category: "strength",
    primaryMuscles: ["back", "biceps"],
    defaultReps: 10,
    defaultWeightKg: 50,
    isCardio: false,
  },
  {
    id: "seated-cable-row",
    name: "Seated Cable Row",
    category: "strength",
    primaryMuscles: ["back", "biceps"],
    defaultReps: 10,
    defaultWeightKg: 50,
    isCardio: false,
  },
  {
    id: "dumbbell-row",
    name: "Dumbbell Row",
    category: "strength",
    primaryMuscles: ["back"],
    defaultReps: 10,
    defaultWeightKg: 24,
    isCardio: false,
  },
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    category: "strength",
    primaryMuscles: ["back", "glutes", "hamstrings"],
    defaultReps: 5,
    defaultWeightKg: 100,
    isCardio: false,
  },

  // ─── Shoulders ────────────────────────────────────────────────────────────
  {
    id: "barbell-overhead-press",
    name: "Barbell Overhead Press",
    category: "strength",
    primaryMuscles: ["shoulders", "triceps"],
    defaultReps: 6,
    defaultWeightKg: 50,
    isCardio: false,
  },
  {
    id: "dumbbell-shoulder-press",
    name: "Dumbbell Shoulder Press",
    category: "strength",
    primaryMuscles: ["shoulders", "triceps"],
    defaultReps: 10,
    defaultWeightKg: 18,
    isCardio: false,
  },
  {
    id: "lateral-raise",
    name: "Lateral Raise",
    category: "strength",
    primaryMuscles: ["shoulders"],
    defaultReps: 15,
    defaultWeightKg: 8,
    isCardio: false,
  },
  {
    id: "face-pull",
    name: "Face Pull",
    category: "strength",
    primaryMuscles: ["shoulders", "back"],
    defaultReps: 15,
    defaultWeightKg: 20,
    isCardio: false,
  },

  // ─── Biceps ───────────────────────────────────────────────────────────────
  {
    id: "barbell-curl",
    name: "Barbell Curl",
    category: "strength",
    primaryMuscles: ["biceps"],
    defaultReps: 10,
    defaultWeightKg: 30,
    isCardio: false,
  },
  {
    id: "dumbbell-curl",
    name: "Dumbbell Curl",
    category: "strength",
    primaryMuscles: ["biceps"],
    defaultReps: 12,
    defaultWeightKg: 12,
    isCardio: false,
  },
  {
    id: "hammer-curl",
    name: "Hammer Curl",
    category: "strength",
    primaryMuscles: ["biceps", "forearms"],
    defaultReps: 12,
    defaultWeightKg: 12,
    isCardio: false,
  },

  // ─── Triceps ──────────────────────────────────────────────────────────────
  {
    id: "tricep-dip",
    name: "Tricep Dip",
    category: "strength",
    primaryMuscles: ["triceps", "chest"],
    defaultReps: 10,
    isCardio: false,
  },
  {
    id: "skull-crusher",
    name: "Skull Crusher",
    category: "strength",
    primaryMuscles: ["triceps"],
    defaultReps: 10,
    defaultWeightKg: 25,
    isCardio: false,
  },
  {
    id: "tricep-pushdown",
    name: "Tricep Pushdown",
    category: "strength",
    primaryMuscles: ["triceps"],
    defaultReps: 12,
    defaultWeightKg: 25,
    isCardio: false,
  },

  // ─── Legs ─────────────────────────────────────────────────────────────────
  {
    id: "barbell-squat",
    name: "Barbell Back Squat",
    category: "strength",
    primaryMuscles: ["quadriceps", "glutes", "hamstrings"],
    defaultReps: 8,
    defaultWeightKg: 80,
    isCardio: false,
  },
  {
    id: "romanian-deadlift",
    name: "Romanian Deadlift",
    category: "strength",
    primaryMuscles: ["hamstrings", "glutes"],
    defaultReps: 10,
    defaultWeightKg: 70,
    isCardio: false,
  },
  {
    id: "leg-press",
    name: "Leg Press",
    category: "strength",
    primaryMuscles: ["quadriceps", "glutes"],
    defaultReps: 10,
    defaultWeightKg: 120,
    isCardio: false,
  },
  {
    id: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    category: "strength",
    primaryMuscles: ["quadriceps", "glutes"],
    defaultReps: 8,
    defaultWeightKg: 20,
    isCardio: false,
  },
  {
    id: "leg-extension",
    name: "Leg Extension",
    category: "strength",
    primaryMuscles: ["quadriceps"],
    defaultReps: 12,
    defaultWeightKg: 40,
    isCardio: false,
  },
  {
    id: "leg-curl",
    name: "Leg Curl",
    category: "strength",
    primaryMuscles: ["hamstrings"],
    defaultReps: 12,
    defaultWeightKg: 35,
    isCardio: false,
  },
  {
    id: "calf-raise",
    name: "Calf Raise",
    category: "strength",
    primaryMuscles: ["calves"],
    defaultReps: 15,
    defaultWeightKg: 40,
    isCardio: false,
  },
  {
    id: "lunge",
    name: "Dumbbell Lunge",
    category: "strength",
    primaryMuscles: ["quadriceps", "glutes"],
    defaultReps: 10,
    defaultWeightKg: 16,
    isCardio: false,
  },

  // ─── Core ─────────────────────────────────────────────────────────────────
  {
    id: "plank",
    name: "Plank",
    category: "core",
    primaryMuscles: ["core"],
    defaultDurationSeconds: 60,
    isCardio: true,
  },
  {
    id: "crunch",
    name: "Crunch",
    category: "core",
    primaryMuscles: ["core"],
    defaultReps: 20,
    isCardio: false,
  },
  {
    id: "russian-twist",
    name: "Russian Twist",
    category: "core",
    primaryMuscles: ["core"],
    defaultReps: 20,
    isCardio: false,
  },
  {
    id: "leg-raise",
    name: "Hanging Leg Raise",
    category: "core",
    primaryMuscles: ["core"],
    defaultReps: 12,
    isCardio: false,
  },
  {
    id: "ab-rollout",
    name: "Ab Wheel Rollout",
    category: "core",
    primaryMuscles: ["core"],
    defaultReps: 10,
    isCardio: false,
  },
  {
    id: "mountain-climber",
    name: "Mountain Climber",
    category: "core",
    primaryMuscles: ["core"],
    defaultDurationSeconds: 30,
    isCardio: true,
  },

  // ─── Cardio ───────────────────────────────────────────────────────────────
  {
    id: "treadmill-run",
    name: "Treadmill Run",
    category: "cardio",
    primaryMuscles: ["cardio"],
    defaultDurationSeconds: 1800,
    isCardio: true,
  },
  {
    id: "stationary-bike",
    name: "Stationary Bike",
    category: "cardio",
    primaryMuscles: ["cardio", "quadriceps"],
    defaultDurationSeconds: 1800,
    isCardio: true,
  },
  {
    id: "rowing-machine",
    name: "Rowing Machine",
    category: "cardio",
    primaryMuscles: ["cardio", "back"],
    defaultDurationSeconds: 1200,
    isCardio: true,
  },
  {
    id: "elliptical",
    name: "Elliptical",
    category: "cardio",
    primaryMuscles: ["cardio"],
    defaultDurationSeconds: 1800,
    isCardio: true,
  },
  {
    id: "jump-rope",
    name: "Jump Rope",
    category: "cardio",
    primaryMuscles: ["cardio", "calves"],
    defaultDurationSeconds: 300,
    isCardio: true,
  },
  {
    id: "stair-climber",
    name: "Stair Climber",
    category: "cardio",
    primaryMuscles: ["cardio", "quadriceps", "glutes"],
    defaultDurationSeconds: 1200,
    isCardio: true,
  },
];

export function searchExercises(query: string): ExerciseItem[] {
  if (!query.trim()) return EXERCISES;
  const q = query.toLowerCase();
  return EXERCISES.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.primaryMuscles.some((m) => m.toLowerCase().includes(q)) ||
      e.category.toLowerCase().includes(q)
  );
}
