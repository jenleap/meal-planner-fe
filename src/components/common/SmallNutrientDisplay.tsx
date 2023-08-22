import { Divider, Stack, Typography } from "@mui/material";
import { NutrientGroup } from "../../interfaces/NutrientGroup";

type NutrientProps = {
    macros: NutrientGroup | undefined;
}

const SmallNutrientDisplay = ({ macros }: NutrientProps) => {
    return (
        <Stack 
            direction="row" 
            divider={<Divider orientation="vertical" flexItem />}
            spacing={ 2 }
        >
            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
                { macros?.calories }cal
            </Typography>
            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
                { macros?.protein }p
            </Typography>
            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
                { macros?.carbs }c
            </Typography>
            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
                { macros?.fat }f
            </Typography>
        </Stack>
    )
}

export default SmallNutrientDisplay;