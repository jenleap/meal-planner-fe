import { Food } from "../interfaces/Food"

export const getMeasureIdByLabel = (label: string, food: Food) => {
    return food.measures.filter(m => m.label == label)[0].id;
}