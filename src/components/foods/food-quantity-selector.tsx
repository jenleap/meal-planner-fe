import { Button, Card, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Food } from '../../interfaces/Food';
import { MeasuredFood } from '../../interfaces/MeasuredFood';
import FractionSelect from '../common/FractionSelect';

type FoodQuantitySelectorProps = {
    food: Food;
    addFood: (measuredFood: MeasuredFood) => void;
}

const FoodQuantitySelector = ({ food, addFood }: FoodQuantitySelectorProps) => {
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
                label: measure
            };
            addFood(measuredFood);
        }
    }


    return (
        <Card sx={{ p: 1.2, m: 1.2 }}>
            <Stack direction="row" sx={{ mb: 1.2 }} >
                <Typography>{ food.name } ({ food.brand })</Typography>
            </Stack>
            <Stack direction="row" sx={{ mb: 1.2 }}>
                <FractionSelect 
                    decimalNum={ quantity }
                    amountChanged={ updateQuantity }
                />
                    <FormControl fullWidth>
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
            </Stack>
            <Stack direction="row">
                <Button variant="outlined" className="mr-4" onClick={updateFood}>Add</Button>
            </Stack>
        </Card>
    )
}

export default FoodQuantitySelector;
