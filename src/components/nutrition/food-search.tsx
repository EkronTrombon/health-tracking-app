"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchFoods, calculateMacrosForServing } from "@/data/foods";
import type { FoodItem } from "@/types/nutrition.types";

export interface FoodSearchSelection {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (selection: FoodSearchSelection) => void;
}

export function FoodSearch({ value, onChange, onSelect }: FoodSearchProps) {
  const [results, setResults] = useState<FoodItem[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update search results as the user types
  useEffect(() => {
    const matches = searchFoods(value);
    setResults(matches);
    setOpen(matches.length > 0 && value.trim().length > 0);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(food: FoodItem) {
    const macros = calculateMacrosForServing(food, food.defaultServingG ?? 100);
    onSelect({
      name: food.name,
      calories: macros.calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
    });
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search foods or enter custom name..."
          className="pl-9 pr-9"
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            onClick={() => { onChange(""); setOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute z-50 top-full mt-1 w-full rounded-lg border bg-popover shadow-md overflow-hidden">
          <p className="px-3 py-1.5 text-xs text-muted-foreground border-b">
            Select to auto-fill macros
          </p>
          <ul className="max-h-52 overflow-y-auto">
            {results.map((food) => {
              const macros = calculateMacrosForServing(
                food,
                food.defaultServingG ?? 100
              );
              return (
                <li key={food.id}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-accent transition-colors text-left"
                    onClick={() => handleSelect(food)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{food.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {food.defaultServingG ?? 100}g serving
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground text-right shrink-0 ml-2">
                      <span className="font-semibold text-foreground">
                        {macros.calories} kcal
                      </span>
                      <br />
                      P{macros.protein}g · C{macros.carbs}g · F{macros.fat}g
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
