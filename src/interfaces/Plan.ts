import { NutrientGroup } from "./NutrientGroup";
import { PlannerDay } from "./PlannerDay";

export interface Plan {
    id: number;
    title: string;
    plannerDays: PlannerDay[];
    dailyMacros: NutrientGroup;
    calories: number,
    carbs: number;
    fat: number;
    protein: number;
}