import { Step } from "./Step";

export interface BaseRecipe {
    name: string;
    description: string;
    servings: number;
    imagePath: string;
    steps: Step[];
}