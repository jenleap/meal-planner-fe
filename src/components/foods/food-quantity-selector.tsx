import { Box, Button, Card, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Food } from '../../interfaces/Food';
import { MeasuredFood } from '../../interfaces/MeasuredFood';
import FractionSelect from '../common/FractionSelect';

type FoodQuantitySelectorProps = {
    food: Food;
    addFood: (measuredFood: MeasuredFood) => void;
    cancelFood: () => void;
}

const FoodQuantitySelector = ({ food, addFood, cancelFood }: FoodQuantitySelectorProps) => {
    const [ quantity, setQuantity ] = useState(0);
    const [ measure, setMeasure ] = useState("");

    useEffect(() => {
        setMeasure(food.measures[0].label);
      }, []);

    const updateQuantity = (quantity: number) => {
        setQuantity(quantity);
    }

    const updateMeasure = (event: SelectChangeEvent<string>) => {
        console.log(event.target.value);
        setMeasure(event.target.value);
    }

    const updateFood = () => {
        if (quantity > 0 && measure.length > 0) {
            const measuredFood = {
                food,
                quantity,
                label: measure,
                measureId: food.measures.filter(m => m.label === measure)[0].id
            };
            addFood(measuredFood);
        }
    }


    return (
        <>
            <Stack direction="row" sx={{ mb: 1.2 }} >
                <Typography>{ food.name } ({ food.brand })</Typography>
            </Stack>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', minWidth: '300px' }}>
                <FractionSelect 
                    decimalNum={ quantity }
                    amountChanged={ updateQuantity }
                />
                    <FormControl fullWidth sx={{ marginLeft: '5px'}}>
                        <Select
                            labelId="measure-select"
                            id="measure-select"
                            value={ measure }
                            label="Measure"
                            onChange={ updateMeasure }
                        >
                        {
                            food.measures.map(m => (
                                <MenuItem key={ m.label } value={ m.label }>{ m.label }</MenuItem>
                            ))
                        }
                        </Select>
                    </FormControl>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '15px'}}>
                <Button onClick={ cancelFood }>Cancel</Button>
                <Button variant="outlined" onClick={updateFood}>Add</Button>   
            </Box>
        </>
    )
}

export default FoodQuantitySelector;
