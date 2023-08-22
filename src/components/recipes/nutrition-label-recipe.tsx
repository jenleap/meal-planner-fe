import { Box, Divider, Typography } from "@mui/material"
import { NutrientGroup } from "../../interfaces/NutrientGroup"

type NutritionLabelRecipeProps = {
    servings: number | undefined,
    nutritionalInfo: NutrientGroup | undefined
}

export const NutritionLabelRecipe = ({ servings, nutritionalInfo }: NutritionLabelRecipeProps) => {
    return (
        <Box sx={{ 
            border: '8px solid black', 
            borderRadius: '4px', 
            padding: '5px 15px',
            backgroundColor: 'white',
            display: 'flex',
            gap: '40px'}}>
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold'}}>Nutrition Info</Typography>
                <Typography variant="subtitle2">Servings per recipe: { servings }</Typography>
            </Box>
            <Box>
                <Typography variant="caption" sx={{ fontWeight: 'bold'}}>Amount / Serving</Typography>
                <Divider sx={{ borderWidth: '3px', borderColor: 'black'}} />
                <Box sx={{ display: 'flex'}}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: '10px'}}>Calories</Typography>
                    <Typography variant="body2">{ nutritionalInfo?.calories }</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex'}}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: '10px'}}>Protein</Typography>
                    <Typography variant="body2">{ nutritionalInfo?.protein }g</Typography>
                </Box>
            </Box>
            <Box>
                <Typography variant="caption" sx={{ fontWeight: 'bold'}}>Amount / Serving</Typography>
                <Divider sx={{ borderWidth: '3px', borderColor: 'black'}} />
                <Box sx={{ display: 'flex'}}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: '10px'}}>Carbohydrate</Typography>
                    <Typography variant="body2">{ nutritionalInfo?.carbs }g</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex'}}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: '10px'}}>Fat</Typography>
                    <Typography variant="body2">{ nutritionalInfo?.fat }g</Typography>
                </Box>
            </Box>
        </Box>
    )
}