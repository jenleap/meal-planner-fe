import { BaseRecipe } from "./BaseRecipe";
import { IngredientDisplay } from "./IngredientDisplay";
import { NutrientGroup } from "./NutrientGroup";

export interface Recipe extends BaseRecipe {
    id: number;
    ingredients: IngredientDisplay[];
    nutritionalInfo: NutrientGroup;
}