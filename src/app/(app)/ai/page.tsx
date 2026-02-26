import type { Metadata } from "next";
import { Bot } from "lucide-react";

export const metadata: Metadata = { title: "AI Assistant" };

export default function AiPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="w-6 h-6 text-[var(--ai-accent)]" />
          AI Assistant
        </h2>
        <p className="text-muted-foreground mt-1">
          Your personal AI health coach powered by Claude.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <Bot className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
        <h3 className="font-semibold text-lg mb-1">AI features coming in v0.5</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Chat with Claude for meal suggestions, workout plans, and personalized health insights based on your data.
        </p>
      </div>
    </div>
  );
}
