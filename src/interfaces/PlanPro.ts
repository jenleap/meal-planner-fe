import { FoodItemDisplay } from "./FoodItem";
import { NutrientGroup } from "./NutrientGroup";
import { TemplatePro } from "./TemplatePro";

export interface PlanPro {
    id: number;
    title: string;
    planDays: PlanProDay[];
    dailyMacros: NutrientGroup;
}

export interface PlanProDay {
    id: number;
    day: number;
    foodBlocks: FoodBlockPro[];
    dailyMacros: NutrientGroup;
    goalMacros: NutrientGroup;
}

export interface FoodBlockPro {
    id: number;
    label: string;
    foodItems: FoodItemDisplay[];
    nutritionalInfo: NutrientGroup;
    goalMacros: NutrientGroup;
}