import { FoodItemDisplay } from "./FoodItem";
import { NutrientGroup } from "./NutrientGroup";

export interface Meal {
    id: number;
    name: string;
    mealItems: FoodItemDisplay[];
    nutritionalInfo: NutrientGroup;
}