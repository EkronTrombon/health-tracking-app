import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FoodLogEntry } from "@/types/nutrition.types";

interface FoodLogEntryProps {
  entry: FoodLogEntry;
  onDelete: (entryId: string) => void;
}

export function FoodLogEntryRow({ entry, onDelete }: FoodLogEntryProps) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/40 transition-colors group">
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-medium truncate">{entry.foodName}</span>
        {entry.brandName && (
          <span className="text-xs text-muted-foreground">{entry.brandName}</span>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-3">
        <div className="hidden sm:flex items-center gap-1">
          <Badge variant="secondary" className="text-xs px-1.5 py-0 font-normal">
            P {Math.round(entry.protein)}g
          </Badge>
          <Badge variant="secondary" className="text-xs px-1.5 py-0 font-normal">
            C {Math.round(entry.carbs)}g
          </Badge>
          <Badge variant="secondary" className="text-xs px-1.5 py-0 font-normal">
            F {Math.round(entry.fat)}g
          </Badge>
        </div>

        <span
          className="text-sm font-semibold w-16 text-right"
          style={{ color: "var(--nutrition)" }}
        >
          {Math.round(entry.calories)} kcal
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onDelete(entry.id)}
          aria-label={`Delete ${entry.foodName}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
