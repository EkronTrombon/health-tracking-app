import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StartSessionForm } from "@/components/workout/start-session-form";
import { ActiveSession } from "@/components/workout/active-session";
import { workoutService } from "@/lib/di";

export const metadata: Metadata = { title: "Log Workout" };

interface LogWorkoutPageProps {
  searchParams: Promise<{ session?: string }>;
}

export default async function LogWorkoutPage({ searchParams }: LogWorkoutPageProps) {
  const { session: sessionId } = await searchParams;

  // No session ID → show the "start a session" form
  if (!sessionId) {
    return (
      <div>
        <div className="mb-6 flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href="/workouts">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Start a Workout</h2>
            <p className="text-muted-foreground mt-0.5">
              Name your session, then log your sets.
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Dumbbell className="w-4 h-4 text-(--workout)" />
                New Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StartSessionForm />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Session ID provided → fetch and show active session
  const session = await workoutService.getWorkoutById(sessionId);

  if (!session || session.completedAt) {
    redirect("/workouts");
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link href="/workouts">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Active Workout</h2>
          <p className="text-muted-foreground mt-0.5">
            Log sets, then finish when done.
          </p>
        </div>
      </div>

      <ActiveSession session={session} />
    </div>
  );
}
