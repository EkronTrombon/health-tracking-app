import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = { title: "Log Meal" };

export default function LogMealPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link href="/nutrition">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Log a Meal</h2>
          <p className="text-muted-foreground mt-0.5">Search and log what you ate.</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <p className="text-sm text-muted-foreground">
          Meal logging form will be built in v0.2.
        </p>
      </div>
    </div>
  );
}
