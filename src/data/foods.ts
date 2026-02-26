import type { FoodItem } from "@/types/nutrition.types";

/**
 * Static food library — ~50 common foods with macros per 100g.
 * Used for client-side autocomplete in the log meal form.
 * At v0.8 this is supplemented by the Open Food Facts API.
 */
export const FOODS: FoodItem[] = [
  // ─── Proteins ──────────────────────────────────────────────────────────────
  { id: "chicken-breast", name: "Chicken Breast (cooked)", caloriesPer100g: 165, proteinPer100g: 31, carbsPer100g: 0, fatPer100g: 3.6, defaultServingG: 150 },
  { id: "salmon", name: "Salmon (cooked)", caloriesPer100g: 208, proteinPer100g: 20, carbsPer100g: 0, fatPer100g: 13, defaultServingG: 150 },
  { id: "ground-beef", name: "Ground Beef 80/20 (cooked)", caloriesPer100g: 254, proteinPer100g: 26, carbsPer100g: 0, fatPer100g: 17, defaultServingG: 150 },
  { id: "tuna-canned", name: "Tuna (canned in water)", caloriesPer100g: 116, proteinPer100g: 26, carbsPer100g: 0, fatPer100g: 1, defaultServingG: 85 },
  { id: "eggs", name: "Eggs (whole, large)", caloriesPer100g: 143, proteinPer100g: 13, carbsPer100g: 1, fatPer100g: 10, defaultServingG: 50 },
  { id: "egg-whites", name: "Egg Whites", caloriesPer100g: 52, proteinPer100g: 11, carbsPer100g: 0.7, fatPer100g: 0.2, defaultServingG: 100 },
  { id: "greek-yogurt", name: "Greek Yogurt (plain, 0%)", caloriesPer100g: 59, proteinPer100g: 10, carbsPer100g: 3.6, fatPer100g: 0.4, defaultServingG: 200 },
  { id: "cottage-cheese", name: "Cottage Cheese (low-fat)", caloriesPer100g: 72, proteinPer100g: 12, carbsPer100g: 3, fatPer100g: 1, defaultServingG: 200 },
  { id: "turkey-breast", name: "Turkey Breast (cooked)", caloriesPer100g: 135, proteinPer100g: 30, carbsPer100g: 0, fatPer100g: 1, defaultServingG: 150 },
  { id: "shrimp", name: "Shrimp (cooked)", caloriesPer100g: 99, proteinPer100g: 24, carbsPer100g: 0, fatPer100g: 0.3, defaultServingG: 150 },
  { id: "protein-shake", name: "Whey Protein Shake", caloriesPer100g: 120, proteinPer100g: 24, carbsPer100g: 3, fatPer100g: 2, defaultServingG: 35 },

  // ─── Carbs & Grains ─────────────────────────────────────────────────────────
  { id: "white-rice", name: "White Rice (cooked)", caloriesPer100g: 130, proteinPer100g: 2.7, carbsPer100g: 28, fatPer100g: 0.3, defaultServingG: 200 },
  { id: "brown-rice", name: "Brown Rice (cooked)", caloriesPer100g: 123, proteinPer100g: 2.6, carbsPer100g: 26, fatPer100g: 0.9, defaultServingG: 200 },
  { id: "oats", name: "Oats (dry rolled)", caloriesPer100g: 389, proteinPer100g: 17, carbsPer100g: 66, fatPer100g: 7, defaultServingG: 80 },
  { id: "pasta", name: "Pasta (cooked)", caloriesPer100g: 158, proteinPer100g: 5.8, carbsPer100g: 31, fatPer100g: 0.9, defaultServingG: 200 },
  { id: "bread-white", name: "White Bread", caloriesPer100g: 265, proteinPer100g: 9, carbsPer100g: 49, fatPer100g: 3.2, defaultServingG: 50 },
  { id: "bread-whole-wheat", name: "Whole Wheat Bread", caloriesPer100g: 247, proteinPer100g: 13, carbsPer100g: 41, fatPer100g: 3.4, defaultServingG: 50 },
  { id: "sweet-potato", name: "Sweet Potato (cooked)", caloriesPer100g: 90, proteinPer100g: 2, carbsPer100g: 21, fatPer100g: 0.1, defaultServingG: 200 },
  { id: "potato", name: "Potato (boiled)", caloriesPer100g: 87, proteinPer100g: 1.9, carbsPer100g: 20, fatPer100g: 0.1, defaultServingG: 200 },
  { id: "quinoa", name: "Quinoa (cooked)", caloriesPer100g: 120, proteinPer100g: 4.4, carbsPer100g: 22, fatPer100g: 1.9, defaultServingG: 185 },

  // ─── Vegetables ─────────────────────────────────────────────────────────────
  { id: "broccoli", name: "Broccoli (cooked)", caloriesPer100g: 35, proteinPer100g: 2.4, carbsPer100g: 7, fatPer100g: 0.4, defaultServingG: 150 },
  { id: "spinach", name: "Spinach (raw)", caloriesPer100g: 23, proteinPer100g: 2.9, carbsPer100g: 3.6, fatPer100g: 0.4, defaultServingG: 100 },
  { id: "mixed-salad", name: "Mixed Salad Greens", caloriesPer100g: 20, proteinPer100g: 1.8, carbsPer100g: 3.3, fatPer100g: 0.3, defaultServingG: 100 },
  { id: "bell-pepper", name: "Bell Pepper (raw)", caloriesPer100g: 31, proteinPer100g: 1, carbsPer100g: 6, fatPer100g: 0.3, defaultServingG: 150 },
  { id: "cucumber", name: "Cucumber (raw)", caloriesPer100g: 16, proteinPer100g: 0.7, carbsPer100g: 3.6, fatPer100g: 0.1, defaultServingG: 150 },
  { id: "tomato", name: "Tomato (raw)", caloriesPer100g: 18, proteinPer100g: 0.9, carbsPer100g: 3.9, fatPer100g: 0.2, defaultServingG: 150 },

  // ─── Fruits ─────────────────────────────────────────────────────────────────
  { id: "banana", name: "Banana", caloriesPer100g: 89, proteinPer100g: 1.1, carbsPer100g: 23, fatPer100g: 0.3, defaultServingG: 120 },
  { id: "apple", name: "Apple", caloriesPer100g: 52, proteinPer100g: 0.3, carbsPer100g: 14, fatPer100g: 0.2, defaultServingG: 182 },
  { id: "strawberries", name: "Strawberries", caloriesPer100g: 32, proteinPer100g: 0.7, carbsPer100g: 7.7, fatPer100g: 0.3, defaultServingG: 150 },
  { id: "blueberries", name: "Blueberries", caloriesPer100g: 57, proteinPer100g: 0.7, carbsPer100g: 14, fatPer100g: 0.3, defaultServingG: 150 },
  { id: "orange", name: "Orange", caloriesPer100g: 47, proteinPer100g: 0.9, carbsPer100g: 12, fatPer100g: 0.1, defaultServingG: 180 },

  // ─── Fats & Dairy ────────────────────────────────────────────────────────────
  { id: "avocado", name: "Avocado", caloriesPer100g: 160, proteinPer100g: 2, carbsPer100g: 9, fatPer100g: 15, defaultServingG: 100 },
  { id: "olive-oil", name: "Olive Oil", caloriesPer100g: 884, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 100, defaultServingG: 14 },
  { id: "almonds", name: "Almonds", caloriesPer100g: 579, proteinPer100g: 21, carbsPer100g: 22, fatPer100g: 50, defaultServingG: 30 },
  { id: "peanut-butter", name: "Peanut Butter", caloriesPer100g: 588, proteinPer100g: 25, carbsPer100g: 20, fatPer100g: 50, defaultServingG: 32 },
  { id: "milk-whole", name: "Whole Milk", caloriesPer100g: 61, proteinPer100g: 3.2, carbsPer100g: 4.8, fatPer100g: 3.3, defaultServingG: 240 },
  { id: "milk-skim", name: "Skim Milk", caloriesPer100g: 34, proteinPer100g: 3.4, carbsPer100g: 5, fatPer100g: 0.2, defaultServingG: 240 },
  { id: "cheese-cheddar", name: "Cheddar Cheese", caloriesPer100g: 402, proteinPer100g: 25, carbsPer100g: 1.3, fatPer100g: 33, defaultServingG: 30 },
  { id: "butter", name: "Butter", caloriesPer100g: 717, proteinPer100g: 0.9, carbsPer100g: 0.1, fatPer100g: 81, defaultServingG: 14 },

  // ─── Convenience & Mixed ─────────────────────────────────────────────────────
  { id: "pizza-slice", name: "Pizza (cheese slice)", caloriesPer100g: 266, proteinPer100g: 11, carbsPer100g: 33, fatPer100g: 10, defaultServingG: 107 },
  { id: "burger", name: "Hamburger (plain)", caloriesPer100g: 250, proteinPer100g: 13, carbsPer100g: 24, fatPer100g: 11, defaultServingG: 100 },
  { id: "french-fries", name: "French Fries", caloriesPer100g: 312, proteinPer100g: 3.4, carbsPer100g: 41, fatPer100g: 15, defaultServingG: 150 },
  { id: "coffee-black", name: "Coffee (black)", caloriesPer100g: 1, proteinPer100g: 0.1, carbsPer100g: 0, fatPer100g: 0, defaultServingG: 240 },
  { id: "orange-juice", name: "Orange Juice", caloriesPer100g: 45, proteinPer100g: 0.7, carbsPer100g: 10, fatPer100g: 0.2, defaultServingG: 240 },
  { id: "protein-bar", name: "Protein Bar (generic)", caloriesPer100g: 380, proteinPer100g: 30, carbsPer100g: 40, fatPer100g: 10, defaultServingG: 60 },
  { id: "granola", name: "Granola", caloriesPer100g: 471, proteinPer100g: 10, carbsPer100g: 64, fatPer100g: 20, defaultServingG: 60 },
  { id: "mixed-nuts", name: "Mixed Nuts", caloriesPer100g: 607, proteinPer100g: 20, carbsPer100g: 21, fatPer100g: 54, defaultServingG: 30 },
];

/**
 * Search foods by name (case-insensitive, partial match).
 * Returns up to 8 results.
 */
export function searchFoods(query: string): FoodItem[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return FOODS.filter((f) => f.name.toLowerCase().includes(q)).slice(0, 8);
}

/**
 * Calculate macros for a food item at a given serving size.
 */
export function calculateMacrosForServing(
  food: FoodItem,
  servingG: number
): { calories: number; protein: number; carbs: number; fat: number } {
  const ratio = servingG / 100;
  return {
    calories: Math.round(food.caloriesPer100g * ratio),
    protein: Math.round(food.proteinPer100g * ratio * 10) / 10,
    carbs: Math.round(food.carbsPer100g * ratio * 10) / 10,
    fat: Math.round(food.fatPer100g * ratio * 10) / 10,
  };
}
