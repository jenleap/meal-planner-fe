import React, { useEffect, useState } from 'react';

import Loader from '../common/Loader';
import Message from '../common/Message';
import FractionDisplay from '../common/FractionDisplay';
import { useParams } from 'react-router-dom';
import { Recipe } from '../../interfaces/Recipe';
import SmallNutrientDisplay from '../common/SmallNutrientDisplay';
import { SplitScreen } from '../common';
import { Box, Divider, List, ListItem, Paper, Typography } from '@mui/material';
import styled from 'styled-components';

type ImageContainerProps = {
    image: string;
}

const ImageContainer = styled.div<ImageContainerProps>`
    background-image: url(${props => require(`../../assets/images/${props.image}`)});
    background-position: center;
    background-size: cover;
    width: 240px;
    height: 240px;
`;


const RecipeDetail = () => {
    const [ recipe, setRecipe ] = useState<Recipe | undefined>(undefined);
    const [ error, setError ] = useState("");
    const { recipeId } = useParams();

    useEffect(() => {
       getRecipe()
    }, []);

    async function getRecipe() {
        const res = await fetch(`http://localhost:3002/api/recipes/${ recipeId }`);
        const json = await res.json();
        setRecipe(json);
        console.log(recipe, json);
    }

    return (
        <Paper elevation={ 3 } sx={{ padding: '20px', width: '80%', margin: ' 20px auto'}}>
            <Box sx={{ display: 'flex'}}>
                <ImageContainer image="dessert.jpg"></ImageContainer>
                <Box sx={{ marginLeft: '30px'}}>
                    <Typography variant='h5' sx={{}}>{ recipe?.name }</Typography>
                    <Typography variant='body1'>{ recipe?.description} </Typography>
                    <Divider sx={{ margin: '15px 0'}} />
                    <Typography variant='subtitle1'>Yield: { recipe?.servings} </Typography>
                    <Typography variant='subtitle2'>Nutritional Info per Serving:</Typography>
                    <SmallNutrientDisplay 
                        macros={ recipe!.nutritionalInfo }
                    />
                </Box>
                
            </Box>
            <Box sx={{ display: 'flex', marginTop: '20px'}}>
            <Box sx={{ width: '40%'}}>
                <Typography variant='overline'>Ingredients</Typography>
                    <List>
                    { (recipe?.ingredients) ? (recipe.ingredients.map(i => (
                        <ListItem key={i.id}>
                            <FractionDisplay decimalNum={i.quantity}/> 
                            <Typography variant='body1'>&nbsp; { i.measureLabel } { i.name }</Typography>
                        </ListItem>
                    ))) : null}
                    </List>
            </Box>
            <Box>
                <Typography variant='overline'>Directions</Typography>
                    <List>
                                    { (recipe?.steps) ? (recipe.steps.map(s => (
                                        <ListItem key={s.id}>
                                            <Typography variant='body1'>{ s.order }. { s.instruction }</Typography>
                                        </ListItem>
                                    ))) : null}
                                </List>
                            </Box>
            </Box>
        </Paper>
    )
}

export default RecipeDetail;
