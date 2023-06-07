import { Food } from "./Food";

export interface MeasuredFood {
    id?: number;
    food: Food;
    label: string;
    quantity: number;
    measureId?: number;
}