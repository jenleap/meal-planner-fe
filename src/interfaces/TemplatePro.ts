import { MealBlock } from "./MealBlock";
import { NutrientGroup } from "./NutrientGroup";

export interface TemplatePro {
    id: number;
    title: string;
    days: TemplateProDay[];
    dailyMacros: NutrientGroup;
}

export interface TemplateProDay {
    id: number;
    dayIndex: number;
    meals: MealBlock[];
    dailyMacros: NutrientGroup;
}