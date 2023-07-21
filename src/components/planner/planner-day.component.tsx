import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { fontSize } from '@mui/system';
import styled from 'styled-components';
import { Food } from '../../interfaces/Food';
import { FoodBlock } from '../../interfaces/FoodBlock';
import FoodBlockComponent from './food-block.component';
import { NutrientGroup } from '../../interfaces/NutrientGroup';
import SmallNutrientDisplay from '../common/SmallNutrientDisplay';
import CompareNutrientDisplay from '../common/CompareNutrientDisplay';

type PlannerDayProps = {
    foodBlocks: FoodBlock[],
    actualMacros: NutrientGroup,
    goalMacros: NutrientGroup,
    handleUpdates: () => void
}
  
export const PlannerDay = ({ foodBlocks, actualMacros, goalMacros, handleUpdates }: PlannerDayProps) => {


    return (
            <Box>
                <CompareNutrientDisplay actualMacros={actualMacros} goalMacros={goalMacros} />
               {foodBlocks.map(block => (
                    <FoodBlockComponent
                        key={ block.id }
                        block={ block } 
                        handleUpdates={ handleUpdates }
                    />
                ))
               }
            </Box>
    );
}
  
export default PlannerDay;