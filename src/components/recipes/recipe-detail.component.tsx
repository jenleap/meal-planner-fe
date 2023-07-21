import React, { useEffect, useState } from 'react';

import Loader from '../common/Loader';
import Message from '../common/Message';
import FractionDisplay from '../common/FractionDisplay';
import { useParams } from 'react-router-dom';
import { Recipe } from '../../interfaces/Recipe';
import SmallNutrientDisplay from '../common/SmallNutrientDisplay';
import { SplitScreen } from '../common';
import { Box, List, ListItem, Typography } from '@mui/material';
import styled from 'styled-components';

const RecipeContainer = styled.div`
    width: 80%;
    margin: auto;
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
        <div>
            { (recipe === undefined) ? <Loader />
                : error ? <Message variant="danger">{ error }</Message>
                    :
                    <RecipeContainer>
                        <div style={{ backgroundImage: `url('http://localhost:3002/api/recipes/image/${recipe.imagePath}')`, backgroundSize: 'cover', height: '300px', backgroundPosition: 'center'}}></div>
                            <Box>
                                <Typography>{ recipe.name }</Typography>
                                <p>{ recipe.description }</p>
                                <SmallNutrientDisplay 
                                    macros={ recipe.nutritionalInfo }
                                />
                            </Box>
                        <SplitScreen leftWeight={2} rightWeight={3}>
                            <Box>
                                <h3>Ingredients</h3>
                                <List>
                                    { (recipe.ingredients) ? (recipe.ingredients.map(i => (
                                        <ListItem key={i.id}>
                                            <p className="text-lowercase">
                                                <FractionDisplay decimalNum={i.quantity}/> 
                                                &nbsp; { i.measureLabel } { i.name }</p>
                                        </ListItem>
                                    ))) : null}
                                </List>
                            </Box>
                            <Box>
                                <h3>Steps</h3>
                                <List>
                                    { (recipe.steps) ? (recipe.steps.map(s => (
                                        <ListItem key={s.id}>
                                            <p>{ s.order }. { s.instruction }</p>
                                        </ListItem>
                                    ))) : null}
                                </List>
                            </Box>
                    </SplitScreen>
                    </RecipeContainer>
            }
        </div>
    )
}

export default RecipeDetail;
