import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface DateNavProps {
  date: Date;
}

function formatDisplayDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (formatDate(date) === formatDate(today)) return "Today";
  if (formatDate(date) === formatDate(yesterday)) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function offsetDate(date: Date, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

export function DateNav({ date }: DateNavProps) {
  const todayStr = formatDate(new Date());
  const isToday = formatDate(date) === todayStr;

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="outline" size="icon" className="h-8 w-8">
        <Link href={`/nutrition?date=${offsetDate(date, -1)}`} aria-label="Previous day">
          <ChevronLeft className="w-4 h-4" />
        </Link>
      </Button>

      <div className="flex items-center gap-2 min-w-32 justify-center">
        <span className="text-sm font-semibold">{formatDisplayDate(date)}</span>
        {!isToday && (
          <Button asChild variant="ghost" size="sm" className="h-6 px-2 text-xs">
            <Link href="/nutrition">Today</Link>
          </Button>
        )}
      </div>

      <Button
        asChild
        variant="outline"
        size="icon"
        className="h-8 w-8"
        aria-label="Next day"
      >
        <Link href={`/nutrition?date=${offsetDate(date, 1)}`}>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
}
