import { NutrientGroup } from "./NutrientGroup";

export interface FoodItemDisplay {
    id: number;
    quantity: number,
    name: string,
    measureLabel: string
    nutritionalInfo: NutrientGroup;
}