"use client";

import { useState, useEffect } from "react";
import { Timer } from "lucide-react";

interface SessionTimerProps {
  startedAt: string; // ISO string
}

function formatElapsed(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function SessionTimer({ startedAt }: SessionTimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = new Date(startedAt).getTime();

    function tick() {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }

    tick(); // immediate first tick
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  return (
    <div className="flex items-center gap-2 text-primary">
      <Timer className="w-4 h-4" />
      <span className="font-mono text-lg font-semibold tabular-nums">
        {formatElapsed(elapsed)}
      </span>
    </div>
  );
}
