import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, Chip, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import Paginate from '../common/Paginate';
import { Meal } from '../../interfaces/Meal';

type MealSelectorProps = {
    selectMeal: (meal: Meal) => void;
}

const SimpleMealSelector = ({ selectMeal }: MealSelectorProps) => {
    const [query, setQuery] = useState('');
    const [ meals, setMeals ] = useState<Meal[]>([]);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ page, setPage ] = useState(0);

    useEffect(() => {
        getMeals();
      }, []);
  
      async function getMeals() {
          const res = await fetch('http://localhost:3002/api/meals');
          const json = await res.json();
          console.log("Meals", json.meals);
          setMeals(json.meals);
          setTotalPages(json.totalPages);
      }

    const searchMeals = () => {

    }

    const handleMealSelected = (selected: Meal) => {
        console.log("selected", selected);
        selectMeal(selected);
    }


    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Form.Control 
                    type="text"
                    value={ query }
                    onChange={(e) => setQuery(e.target.value)}>    
                </Form.Control>
                <Button variant="outlined" onClick={() => searchMeals()}><SearchIcon /></Button>
            </Box>
            <Box>
             <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    meals.map(meal => (
                        <ListItem 
                            key={ `meal-${ meal.id }`} 
                            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'lightgray'} }}
                            onClick={ () => handleMealSelected(meal)}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                <Typography component="div">{ meal.name }</Typography>
                                <Chip sx={{ marginRight: '20px'}} label={ meal.nutritionalInfo.calories } color="primary" variant="outlined"/>
                            </Box>
                        </ListItem>
                    ))
                }
            </List>
            <Paginate 
                totalPages={totalPages}
                page={page}
                itemCall={searchMeals}
            />
            </Box> 
        </>
    )
}

export default SimpleMealSelector;