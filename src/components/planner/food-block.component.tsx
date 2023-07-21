import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material';
import { fontSize } from '@mui/system';
import styled from 'styled-components';
import { Food } from '../../interfaces/Food';
import { MeasuredFood } from '../../interfaces/MeasuredFood';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import FoodSelector from '../foods/food-selector.component';
import { Modal } from '../common';
import { FoodBlock } from '../../interfaces/FoodBlock';
import SmallNutrientDisplay from '../common/SmallNutrientDisplay';
import { FoodDisplayComponent } from './food-display.component';


type FoodBlockProps = {
    block: FoodBlock,
    handleUpdates: () => void
}

const AddWrapper = styled.span`
    margin-top: 5px;
    cursor: pointer;
`;

const DisplayWrapper = styled.div`
    margin-top: 3px;
`;
  
export const FoodBlockComponent = ({ block, handleUpdates }: FoodBlockProps) => {
    const [foodSelector, showFoodSelector] = useState(false);
    

    const closeFoodSelector = () => {
        showFoodSelector(false);
    }

    const addFood = async (food: MeasuredFood) => {
        console.log(food);
        const res = await fetch(`http://localhost:3002/api/planner/${block.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(food)
        });
        console.log(res);

        handleUpdates();
    }

    return (
        <Card sx={{ minWidth: 275, m: 1.2 }}>
            <CardContent>
                <Stack direction="row" spacing={ 2 } sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography sx={{ fontSize: '1rem', marginRight: '20px' }} color="text.primary">
                            <span>{ block.label }</span>
                        </Typography>
                        <DisplayWrapper>
                            <SmallNutrientDisplay macros={ block.nutritionalInfo } />
                        </DisplayWrapper>
                    </Box>
                    <AddWrapper onClick={() => showFoodSelector(true)}><AddIcon /></AddWrapper>
                </Stack>
                
                <Stack direction="row" spacing={ 2 }>
                    <List sx={{ width: '100%'}}>
                        { block.foodItems.map(item => (
                            <ListItem key={ item.id }>
                                <FoodDisplayComponent foodItem={item} />
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </CardContent>  
            <Modal
                showModal={ foodSelector }
                closeModal={ closeFoodSelector }
            >
                <FoodSelector selectFood={ addFood } />
            </Modal>
        </Card>
    );
}
  
export default FoodBlockComponent;