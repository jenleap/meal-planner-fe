import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Food } from '../../interfaces/Food';
import { MeasuredFood } from '../../interfaces/MeasuredFood';
import FoodList from './food-list.component';
import FoodQuantitySelector from './food-quantity-selector';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, Stack } from '@mui/material';
import styled from 'styled-components';
import SmallFoodList from './small-food-list.component';

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

    const handleCancelFood = () => {
        setFood(undefined);
    }

    
    return (
        <>
            {(selectedFood) ? (
                <FoodQuantitySelector 
                    food={ selectedFood } 
                    addFood={ addFood } 
                    cancelFood={ handleCancelFood }
                />
            ) : (
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Form.Control 
                            type="text"
                            value={ query }
                            onChange={(e) => setQuery(e.target.value)}>    
                        </Form.Control>
                        <Button variant="outlined" onClick={() => searchFoods()}><SearchIcon /></Button>
                    </Box>
                    <SmallFoodList 
                        query={ query } 
                        foodSelected={ onFoodSelected }
                    />
                </>
            )}
        </>
    )
}

export default FoodSelector;
