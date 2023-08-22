import { Box, Card, CardContent, Divider, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import { FoodBlockProComponent } from './food-block-pro.component';
import CompareNutrientDisplay from '../common/CompareNutrientDisplay';
import { SplitScreen } from '../common';
import { MeasuredFood } from '../../interfaces/MeasuredFood';
import { useState } from 'react';
import { PlanProDay } from '../../interfaces/PlanPro';
import SimpleFoodSelector from '../foods/simple-food-selector.component';
import { AdvancedFoodSelector } from './advanced-food-selector';


type PlannerDayProps = {
    day: PlanProDay,
    label: string,
    handleUpdates: () => void
}

const DivWrapper = styled.div`
    margin-bottom: 20px;
`;
  
export const PlannerDayProComponent = ({ day, label, handleUpdates }: PlannerDayProps) => {
    const [ showSelector, setShowSelector ] = useState(false);
    const [ selectedFoodBlock, setSelectedFoodBlock ] = useState("");
    
    const addFood = async (food: MeasuredFood) => {
        console.log(food);
        const res = await fetch(`http://localhost:3002/api/planner-pro/${ selectedFoodBlock }`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(food)
        });
        console.log(res);

        handleUpdates();
    }

    const handleOpenSelector = (blockId: string) => {
        setShowSelector(true);
        setSelectedFoodBlock(blockId);
    }

    const handleChangeMeal = (e: SelectChangeEvent<string>) => {
        setSelectedFoodBlock(e.target.value);
    }

    const getMeals = () => {
        return day.foodBlocks.map(block => {
            return {
                label: block.label,
                value: block.id
            }
        });
    }

    return (
            <Box>
                <DivWrapper>
                    <CompareNutrientDisplay actualMacros={day.dailyMacros} goalMacros={ day.goalMacros } />
                </DivWrapper>

                <SplitScreen leftWeight={3} rightWeight={ 1 }>
                    <>
                        {day.foodBlocks.map(block => (
                            <FoodBlockProComponent
                                key={ block.id }
                                block={ block } 
                                openSelector={ handleOpenSelector }
                                handleUpdates={ handleUpdates }
                            />
                        ))
                        }
                    </>
                    {
                        (showSelector && (
                            <Paper sx={{ marginLeft: '15px', padding: '15px'}} elevation={2}>
                                <Typography sx={{ marginBottom: '15px'}}>{ label }</Typography>
                                <FormControl fullWidth sx={{ marginBottom: '15px'}}>
                                    <InputLabel id="meal-select-label">Meal</InputLabel>
                                    <Select
                                        labelId="meal-select-label"
                                        id="meal-select"
                                        value={ selectedFoodBlock }
                                        label="Meal"
                                        onChange={ handleChangeMeal }
                                    >
                                        {
                                            getMeals().map(meal => (
                                                <MenuItem key={ meal.value } value={ meal.value }>{ meal.label }</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <Divider sx={{ marginBottom: '15px'}} />
                                {/* <SimpleFoodSelector selectFood={ addFood } /> */}
                                <AdvancedFoodSelector addFood={ addFood } />
                            </Paper>
                        ))
                    }
                    
                </SplitScreen>
            </Box>
    );
}
  
export default PlannerDayProComponent;