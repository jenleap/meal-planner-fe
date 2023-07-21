import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Food } from '../../interfaces/Food';
import { MeasuredFood } from '../../interfaces/MeasuredFood';
import FoodList from './food-list.component';
import FoodQuantitySelector from './food-quantity-selector';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, Stack } from '@mui/material';
import styled from 'styled-components';

type FoodSelectorProps = {
    selectFood: (measuredFood: MeasuredFood) => void;
}

const FoodSelector = ({ selectFood }: FoodSelectorProps) => {
    const [selectedFood, setFood] = useState<Food | undefined>(undefined);
    const [query, setQuery] = useState('');

    const addFood = (measuredFood: MeasuredFood) => {
        selectFood(measuredFood);
        setFood(undefined);
    }

    const searchFoods = () => {

    }

    const onFoodSelected = (selected: Food) => {
        setFood(selected);
    }

    
    return (
        <Card sx={{ margin: '30px 0 0 30px', padding: '10px', maxHeight: '80vh'}}>
            {(selectedFood) ? (
                <FoodQuantitySelector food={ selectedFood } addFood={ addFood } />
            ) : (
                <>
                    <Stack direction="row" spacing={ 2 }>
                        <Form.Control 
                            type="text"
                            value={ query }
                            onChange={(e) => setQuery(e.target.value)}>    
                        </Form.Control>
                        <Button variant="outlined" onClick={() => searchFoods()}><SearchIcon /></Button>
                    </Stack>
                    <FoodList 
                        query={ query } 
                        foodSelected={ onFoodSelected }
                    />
                </>
            )}
        </Card>
    )
}

export default FoodSelector;
