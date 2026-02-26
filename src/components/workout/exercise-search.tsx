"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchExercises, type ExerciseItem } from "@/data/exercises";
import { cn } from "@/lib/utils";

interface ExerciseSearchProps {
  onSelect: (exercise: ExerciseItem) => void;
  placeholder?: string;
}

export function ExerciseSearch({
  onSelect,
  placeholder = "Search exercises...",
}: ExerciseSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ExerciseItem[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    if (value.trim().length > 0) {
      setResults(searchExercises(value).slice(0, 8));
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  }

  function handleSelect(exercise: ExerciseItem) {
    setQuery(exercise.name);
    setOpen(false);
    onSelect(exercise);
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => {
            if (query.trim()) setOpen(true);
          }}
          placeholder={placeholder}
          className="pl-9"
          autoComplete="off"
        />
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-card shadow-lg overflow-hidden">
          {results.map((exercise) => (
            <li key={exercise.id}>
              <button
                type="button"
                className={cn(
                  "w-full text-left px-3 py-2.5 text-sm hover:bg-muted transition-colors",
                  "flex items-center justify-between gap-2"
                )}
                onClick={() => handleSelect(exercise)}
              >
                <span className="font-medium">{exercise.name}</span>
                <span className="text-xs text-muted-foreground capitalize shrink-0">
                  {exercise.primaryMuscles[0]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
