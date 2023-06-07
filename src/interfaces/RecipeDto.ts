import { BaseRecipe } from "./BaseRecipe";
import { Ingredient } from "./Ingredient";

export interface RecipeDto extends BaseRecipe {
    ingredients: Ingredient[];
}