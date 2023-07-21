import { FoodItemDisplay } from "./FoodItem";
import { NutrientGroup } from "./NutrientGroup";


export interface FoodBlock {
    id: number;
    label: string;
    type: "meal" | "snack";
    foodItems: FoodItemDisplay[];
    nutritionalInfo: NutrientGroup;
}