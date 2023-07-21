import { Divider, Stack, Typography } from "@mui/material";
import { NutrientGroup } from "../../interfaces/NutrientGroup";

type NutrientProps = {
    goalMacros: NutrientGroup,
    actualMacros: NutrientGroup
}

const CompareNutrientDisplay = ({ goalMacros, actualMacros }: NutrientProps) => {
    return (
        <Stack 
            direction="row" 
            divider={<Divider orientation="vertical" flexItem />}
            spacing={ 2 }
        >
            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
                { actualMacros.calories } / { goalMacros.calories } cal
            </Typography>
            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
                { actualMacros.protein } / { goalMacros.protein }p
            </Typography>
            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
                { actualMacros.carbs } / { goalMacros.carbs }c
            </Typography>
            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
                { actualMacros.fat } / { goalMacros.fat }f
            </Typography>
        </Stack>
    )
}

export default CompareNutrientDisplay;