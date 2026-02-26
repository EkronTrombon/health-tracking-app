"use client";

import { useTransition } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SessionTimer } from "./session-timer";
import { SetLogger } from "./set-logger";
import { SessionSetList } from "./session-set-list";
import { finishWorkoutSessionAction } from "@/actions/workout.actions";
import type { WorkoutSession } from "@/types/workout.types";

interface ActiveSessionProps {
  session: WorkoutSession;
}

export function ActiveSession({ session }: ActiveSessionProps) {
  const [isPending, startTransition] = useTransition();

  function handleFinish() {
    startTransition(async () => {
      await finishWorkoutSessionAction(session.id);
    });
  }

  return (
    <div className="space-y-6">
      {/* Session header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {session.name ?? "Workout Session"}
          </h2>
          <SessionTimer startedAt={session.startedAt.toISOString()} />
        </div>

        <Button
          onClick={handleFinish}
          disabled={isPending}
          variant="default"
          className="gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Finishing...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              Finish Workout
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Log a set */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Log a Set</CardTitle>
          </CardHeader>
          <CardContent>
            <SetLogger sessionId={session.id} existingSets={session.sets} />
          </CardContent>
        </Card>

        {/* Sets logged so far */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              Sets Logged
              {session.sets.length > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({session.sets.length})
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SessionSetList sets={session.sets} />
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Bottom finish button for easy access after scrolling */}
      <Button
        onClick={handleFinish}
        disabled={isPending}
        variant="default"
        size="lg"
        className="w-full gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Finishing...
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4" />
            Finish Workout
          </>
        )}
      </Button>
    </div>
  );
}
