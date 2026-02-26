"use client";

import { useRef } from "react";
import { Dumbbell, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { startWorkoutSessionAction } from "@/actions/workout.actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full gap-2" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Starting...
        </>
      ) : (
        <>
          <Dumbbell className="w-4 h-4" />
          Start Workout
        </>
      )}
    </Button>
  );
}

export function StartSessionForm() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form ref={ref} action={startWorkoutSessionAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Session Name (optional)</Label>
        <Input
          id="name"
          name="name"
          placeholder="e.g. Push Day, Leg Day..."
          autoComplete="off"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
