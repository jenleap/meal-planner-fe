import { Measure } from "./Measure";

export interface Food {
    name: string;
    brand: string;
    measures: Measure[];
    isFood?: boolean;
}