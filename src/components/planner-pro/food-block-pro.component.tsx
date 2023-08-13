import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material';
import { fontSize } from '@mui/system';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import SmallNutrientDisplay from '../common/SmallNutrientDisplay';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FoodDisplayProComponent } from './food-display-pro.component';
import { FoodBlockPro } from '../../interfaces/PlanPro';


type FoodBlockProps = {
    block: FoodBlockPro,
    openSelector: (blockId: string) => void
    handleUpdates: () => void
}

const AddWrapper = styled.span`
    margin-top: 5px;
    margin-right: 10px !important;
    cursor: pointer;
`;

const DisplayWrapper = styled.div`
    margin-top: 3px;
`;
  
export const FoodBlockProComponent = ({ block, openSelector, handleUpdates }: FoodBlockProps) => {

    return (

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
                    <AddWrapper onClick={() => openSelector(block.id.toString())}><AddIcon /></AddWrapper>
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
    );
}
  
export default FoodBlockProComponent;