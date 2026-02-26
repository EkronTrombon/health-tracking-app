"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExerciseSearch } from "./exercise-search";
import type { ExerciseItem } from "@/data/exercises";
import type { ExerciseSet } from "@/types/workout.types";
import { addExerciseSetAction } from "@/actions/workout.actions";

// Client-side schema uses z.number() (not coerce) — server re-validates with LogExerciseSetSchema
const SetLoggerSchema = z.object({
  exerciseId: z.string().min(1, "Select an exercise"),
  exerciseName: z.string().min(1, "Select an exercise"),
  reps: z.number().int().min(0).optional(),
  weightKg: z.number().min(0).optional(),
  durationSeconds: z.number().int().min(0).optional(),
  rpe: z.number().min(1).max(10).optional(),
  note: z.string().max(200).optional(),
});

type SetLoggerValues = z.infer<typeof SetLoggerSchema>;

interface SetLoggerProps {
  sessionId: string;
  existingSets: ExerciseSet[];
}

export function SetLogger({ sessionId, existingSets }: SetLoggerProps) {
  const [isPending, startTransition] = useTransition();
  const [isCardio, setIsCardio] = useState(false);

  const form = useForm<SetLoggerValues>({
    resolver: zodResolver(SetLoggerSchema),
    defaultValues: {
      exerciseId: "",
      exerciseName: "",
      reps: undefined,
      weightKg: undefined,
      durationSeconds: undefined,
      rpe: undefined,
      note: "",
    },
  });

  function handleExerciseSelect(exercise: ExerciseItem) {
    form.setValue("exerciseId", exercise.id, { shouldValidate: true });
    form.setValue("exerciseName", exercise.name, { shouldValidate: true });
    setIsCardio(exercise.isCardio);

    if (exercise.isCardio) {
      form.setValue("reps", undefined);
      form.setValue("weightKg", undefined);
      if (exercise.defaultDurationSeconds !== undefined) {
        form.setValue("durationSeconds", exercise.defaultDurationSeconds);
      }
    } else {
      form.setValue("durationSeconds", undefined);
      if (exercise.defaultReps !== undefined) form.setValue("reps", exercise.defaultReps);
      if (exercise.defaultWeightKg !== undefined) form.setValue("weightKg", exercise.defaultWeightKg);
    }
  }

  function onSubmit(data: SetLoggerValues) {
    const setNumber =
      existingSets.filter((s) => s.exerciseName === data.exerciseName).length + 1;

    startTransition(async () => {
      const result = await addExerciseSetAction(sessionId, {
        ...data,
        setNumber,
      });

      if (result.success) {
        form.reset({
          exerciseId: data.exerciseId,
          exerciseName: data.exerciseName,
          reps: data.reps,
          weightKg: data.weightKg,
          durationSeconds: data.durationSeconds,
        });
        // Keep exercise pre-filled so the user can quickly log another set
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        {/* Exercise picker */}
        <FormField
          control={form.control}
          name="exerciseName"
          render={() => (
            <FormItem>
              <FormLabel>Exercise</FormLabel>
              <FormControl>
                <ExerciseSearch onSelect={handleExerciseSelect} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Strength fields */}
        {!isCardio && (
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="reps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reps</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step={1}
                      placeholder="e.g. 8"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.value ? Number(e.target.value) : undefined)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weightKg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step={0.5}
                      placeholder="e.g. 60"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.value ? Number(e.target.value) : undefined)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Cardio fields */}
        {isCardio && (
          <FormField
            control={form.control}
            name="durationSeconds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (seconds)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={1}
                    placeholder="e.g. 1800 (30 min)"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(e.target.value ? Number(e.target.value) : undefined)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* RPE (optional) */}
        <FormField
          control={form.control}
          name="rpe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RPE (1–10, optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  step={0.5}
                  placeholder="Rate of Perceived Exertion"
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : undefined)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Logging...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Log Set
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
