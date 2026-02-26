"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FoodSearch } from "./food-search";
import type { FoodSearchSelection } from "./food-search";
import { LogMealSchema, type LogMealInput, type MealType } from "@/types/nutrition.types";
import { logMealAction } from "@/actions/nutrition.actions";

interface LogMealFormProps {
  defaultMealType?: MealType;
}

export function LogMealForm({ defaultMealType = "snack" }: LogMealFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<LogMealInput>({
    resolver: zodResolver(LogMealSchema),
    defaultValues: {
      foodName: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      mealType: defaultMealType,
    },
  });

  // When a food is selected from search, auto-fill all macro fields
  function handleFoodSelect(selection: FoodSearchSelection) {
    form.setValue("foodName", selection.name, { shouldValidate: true });
    form.setValue("calories", selection.calories, { shouldValidate: true });
    form.setValue("protein", selection.protein, { shouldValidate: true });
    form.setValue("carbs", selection.carbs, { shouldValidate: true });
    form.setValue("fat", selection.fat, { shouldValidate: true });
  }

  function onSubmit(data: LogMealInput) {
    startTransition(async () => {
      await logMealAction(data);
      // logMealAction redirects on success; errors throw and surface to an error boundary
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

        {/* Food name with search autocomplete */}
        <FormField
          control={form.control}
          name="foodName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food Name</FormLabel>
              <FormControl>
                <FoodSearch
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  onSelect={handleFoodSelect}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Macros grid */}
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Calories (kcal)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="protein"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Protein (g)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={0.1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="carbs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carbs (g)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={0.1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fat"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Fat (g)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={0.1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Meal type */}
        <FormField
          control={form.control}
          name="mealType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="breakfast">🌅 Breakfast</SelectItem>
                  <SelectItem value="lunch">☀️ Lunch</SelectItem>
                  <SelectItem value="dinner">🌙 Dinner</SelectItem>
                  <SelectItem value="snack">🍎 Snack</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Logging...
            </>
          ) : (
            "Log Meal"
          )}
        </Button>
      </form>
    </Form>
  );
}
