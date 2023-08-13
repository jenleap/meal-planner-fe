import { NutrientGroup } from "./NutrientGroup";

export interface MealBlock {
    label: string;
    order: number;
    goalMacros: NutrientGroup;
}