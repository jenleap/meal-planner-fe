import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Box, Button, Card, CardContent, Divider, Fade, List, ListItem, ListItemText, Modal, Stack, TextField, Typography } from '@mui/material';
import { fontSize } from '@mui/system';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import SmallNutrientDisplay from '../common/SmallNutrientDisplay';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FoodDisplayProComponent } from './food-display-pro.component';
import { FoodBlockPro } from '../../interfaces/PlanPro';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { getLocalAuthToken } from '../../utils/auth';
import { FoodItemDisplay } from '../../interfaces/FoodItem';


type FoodBlockProps = {
    block: FoodBlockPro,
    openSelector: (blockId: string) => void
    handleUpdates: () => void
}

const IconWrapper = styled.span`
    margin-top: 5px;
    margin-right: 10px !important;
    cursor: pointer;
`;

const DisplayWrapper = styled.div`
    margin-top: 3px;
`;
  
export const FoodBlockProComponent = ({ block, openSelector, handleUpdates }: FoodBlockProps) => {
    const [ showSaveMealModal, setShowSaveMealModal ] = useState(false);
    const [ mealTitle, setMealTitle ] = useState("");

    const handleCloseModal = () => {
        setShowSaveMealModal(false);
      }

      const handleShowModal = () => {
        setShowSaveMealModal(true);
      }

      const handleSave = async () => {
        const newMeal = {
            name: mealTitle,
            mealItems: getMealItems(block.foodItems)
        };

        const res = await fetch(`http://localhost:3002/api/meals`, {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer' + getLocalAuthToken(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMeal)
           });
        console.log(res);
        setShowSaveMealModal(false);
      }

      const getMealItems = (items: FoodItemDisplay[]) => {
        return items.map(item => {
            return {
                food: item.food,
                quantity: item.quantity,
                measureId: item.measureId
            }
        })
      }


    return (
        <>
        <Accordion sx={{ width: '100%'}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}>
                 <Stack direction="row" spacing={ 2 } sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}} onClick={e => e.stopPropagation()}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography sx={{ fontSize: '1rem', marginRight: '20px' }} color="text.primary">
                            <span>{ block.label }</span>
                        </Typography>
                        <DisplayWrapper>
                            <SmallNutrientDisplay macros={ block.nutritionalInfo } />
                        </DisplayWrapper>
                    </Box>
                    <Box>
                        <IconWrapper onClick={ handleShowModal }><SaveIcon /></IconWrapper>
                        <IconWrapper onClick={() => openSelector(block.id.toString())}><AddIcon /></IconWrapper>
                    </Box>
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <Stack direction="row" spacing={ 2 } sx={{ width: "100%"}}>
                    <List sx={{ width: '100%'}}>
                        { block.foodItems.map(item => (
                            <ListItem key={ item.id }>
                                <FoodDisplayProComponent 
                                    foodItem={item} 
                                    blockId={ block.id }
                                    handleUpdates={ handleUpdates }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </AccordionDetails>
        </Accordion>
        <Modal
                open={ showSaveMealModal }
                onClose={ handleCloseModal }
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={ showSaveMealModal }>
                    <Box sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4
                    }}>
                    <Typography>Save meal as:</Typography>
                    <TextField 
                        key="title"  
                        label="Title" 
                        variant="outlined" 
                        value={ mealTitle }
                        onChange={ e => setMealTitle(e.target.value)}
                    />
                    <Divider />
                    <List sx={{ width: '100%'}}>
                        { block.foodItems.map(item => (
                            <ListItem key={ item.id }>
                               <Typography>{ item.quantity} { item.measureLabel } { item.name }</Typography>
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={ handleCloseModal }>Cancel</Button>
                    <Button onClick={ handleSave }>Save</Button>
                </Box>
            </Fade>
        </Modal>
        </>
    );
}
  
export default FoodBlockProComponent;