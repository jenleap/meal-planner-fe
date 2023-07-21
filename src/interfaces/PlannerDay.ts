import { FoodBlock } from "./FoodBlock";
import { NutrientGroup } from "./NutrientGroup";

export interface PlannerDay {
    id: number;
    day: number;
    foodBlocks: FoodBlock[];
    dailyMacros: NutrientGroup;
}