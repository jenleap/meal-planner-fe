import React, { useState } from 'react';
import FoodSelector from '../foods/food-selector.component';
import FractionDisplay from '../common/FractionDisplay';
import { getLocalAuthToken } from '../../utils/auth';
import { Step } from '../../interfaces/Step';
import { MeasuredFood } from '../../interfaces/MeasuredFood';
import AddIcon from '@mui/icons-material/Add';
import { Button, Card, List, ListItem, ListItemText, Paper, Stack, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { getMeasureIdByLabel } from '../../utils/helpers';

const AddWrapper = styled.span`
    margin-top: 5px;
`;

const CreateRecipe = () => {
    const [foodSelector, showFoodSelector] = useState(false);
    const [stepCreator, showStepCreator] = useState(false);
    const [activeStep, setActiveStep] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [servings, setServings] = useState('');
    const [ingredients, setIngredients] = useState<MeasuredFood[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(null);


    const addIngredient = (ingredient: MeasuredFood) => {
        console.log(ingredient);
        setIngredients((prevIngredients) => [
            ...prevIngredients,
            ingredient
        ]);
        showFoodSelector(false);
    }

    const convertIngredients = () => {
        return ingredients.map(i => {
            console.log(i);
            return {
                food: i.food,
                measureId: getMeasureIdByLabel(i.label, i.food),
                quantity: i.quantity,
                notes: ""
            }
        });
    }

    const addStep = () => {
        setSteps((prevSteps) => [
            ...prevSteps,
            {
                instruction: activeStep,
                order: steps.length + 1
            }
        ]);
        setActiveStep('');
    }

    const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files) ? e.target.files[0] : null;
         if (file) {
            setImage(file);
        } 
        
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file as Blob);
    }

    const createRecipeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const recipe = {
            name,
            description,
            servings: parseInt(servings),
            ingredients: convertIngredients(),
            steps
        };

         const data = new FormData();
        data.append("recipe", JSON.stringify(recipe))

        if (image) {
            data.append('image', image);
        } else {
            data.append('image', "");
        }

         const res = await fetch("http://localhost:3002/api/recipes", {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer' + getLocalAuthToken(),
            },
            body: data
           });
        
           console.log(res); 
    }

    return (
        <Paper sx={{ p: 1.5 }}>
            <Typography>New Recipe</Typography>
            <Stack direction="row">
                <Stack direction="column" spacing={ 2 }>
                        <TextField 
                            key="name"  
                            label="Recipe Name" 
                            variant="outlined" 
                            value={ name }
                            onChange={ e => setName(e.target.value)}
                        />

                        <TextField 
                            key="description"  
                            label="Description" 
                            variant="outlined" 
                            value={ description }
                            onChange={ e => setDescription(e.target.value)}
                        />

                        <TextField 
                            key="servings"  
                            label="Servings" 
                            variant="outlined" 
                            value={ servings }
                            onChange={ e => setServings(e.target.value)}
                        />

                        { (imagePreview) ? <img src={ imagePreview.toString() } className="w-25" /> : null }

                        <Form.Group className="mt-3">
                            <Form.Label>Choose an image for the recipe.</Form.Label>
                            <Form.Control 
                                type="file"
                                id="image-file"
                                onChange={uploadFileHandler} />
                        </Form.Group>

                        <h3>Ingredients <AddWrapper onClick={() => showFoodSelector(true)}><AddIcon /></AddWrapper></h3>
                            <List>
                                {
                                    (ingredients) && (
                                        <>
                                        {
                                            ingredients.map(i => (
                                                <ListItem key={i.id}>
                                                    <FractionDisplay decimalNum={i.quantity} />
                                                    <Typography sx={{ ml: 1.2 }}>{ i.label } { i.food.name }</Typography>
                                                </ListItem>
                                            ))
                                        }
                                        </>
                                    )
                                }
                            </List>

                        { (foodSelector) ? <FoodSelector selectFood={addIngredient} /> : null }

                        <h3>Directions <AddWrapper onClick={() => showStepCreator(true)}><AddIcon /></AddWrapper></h3>
                            <List>
                                {
                                    (steps) && (
                                        <>
                                        {
                                            steps.map(s => (
                                                <ListItem key={ s.id }>
                                                    <ListItemText primary={ `${s.order}. ${ s.instruction }`} />
                                                </ListItem>
                                            ))
                                        }
                                        </>
                                    )
                                }
                            </List>

                        { (stepCreator) ? (
                            <Card sx={{ display: 'flex', flexDirection: 'column', gap: '10px', p: '10px' }}>
                                        <TextField 
                                            key="step"  
                                            label="Instruction Step" 
                                            variant="outlined" 
                                            value={ activeStep }
                                            onChange={ e => setActiveStep(e.target.value)}
                                        />
                                    <Button sx={{ width: '50px'}} variant="outlined" className="mr-4" onClick={addStep}>Add</Button>
                            </Card>
                        ) : null }
                        

                        <Button 
                            variant="outlined"
                            type="button"
                            onClick={ createRecipeHandler }>
                            Create Recipe
                        </Button>
                    
                </Stack>
            </Stack>
        </Paper>
    )
}

export default CreateRecipe;
