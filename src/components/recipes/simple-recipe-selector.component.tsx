import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, Chip, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import Paginate from '../common/Paginate';
import { Recipe } from '../../interfaces/Recipe';

type RecipeSelectorProps = {
    selectRecipe: (recipe: Recipe) => void;
}

const SimpleRecipeSelector = ({ selectRecipe }: RecipeSelectorProps) => {
    const [query, setQuery] = useState('');
    const [ recipes, setRecipes ] = useState<Recipe[]>([]);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ page, setPage ] = useState(0);

    useEffect(() => {
        getRecipes();
      }, []);
  
      async function getRecipes() {
        const res = await fetch('http://localhost:3002/api/recipes');
        const json = await res.json();
        setRecipes(json.recipes);
        setTotalPages(json.totalPages);
      }

    const searchRecipes = () => {

    }

    const handleRecipeSelected = (selected: Recipe) => {
        selectRecipe(selected);
    }


    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Form.Control 
                    type="text"
                    value={ query }
                    onChange={(e) => setQuery(e.target.value)}>    
                </Form.Control>
                <Button variant="outlined" onClick={() => searchRecipes()}><SearchIcon /></Button>
            </Box>
            <Box>
             <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    recipes.map(recipe => (
                        <ListItem 
                            key={ `meal-${ recipe.id }`} 
                            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'lightgray'} }}
                            onClick={ () => handleRecipeSelected(recipe)}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                <Typography component="div">{ recipe.name }</Typography>
                                <Chip sx={{ marginRight: '20px'}} label={ recipe.nutritionalInfo.calories } color="primary" variant="outlined"/>
                            </Box>
                        </ListItem>
                    ))
                }
            </List>
            <Paginate 
                totalPages={totalPages}
                page={page}
                itemCall={searchRecipes}
            />
            </Box> 
        </>
    )
}

export default SimpleRecipeSelector;