import { Card, CardContent, Typography } from '@mui/material';
import { fontSize } from '@mui/system';
import styled from 'styled-components';
import { Food } from '../../interfaces/Food';

type FoodItemProps = {
    food: Food;
    foodSelected: (selected: Food) => void;
}
  
export const FoodItem = ({ food, foodSelected }: FoodItemProps) => {


    return (
        <Card sx={{ minWidth: 275, m: 1.2 }} onClick={ () => foodSelected(food)}>
            <CardContent>
                <Typography sx={{ fontSize: '1rem' }} component="div">
                    <span>{ food.name } </span>
                        {
                            (food.brand.length > 0 && food.brand != 'generic') && (
                                <span>({ food.brand })</span>
                            )
                        }
                </Typography>
                <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
                    <span>{`${ food.measures[0].quantity } ${ food.measures[0].label }`}</span>
                </Typography>
            </CardContent>
            
        </Card>
    );
}
  
export default FoodItem;