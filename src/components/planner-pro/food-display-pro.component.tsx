import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, ListItemText, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SmallNutrientDisplay from "../common/SmallNutrientDisplay";
import { useEffect, useState } from "react";
import { FoodItemDisplay } from "../../interfaces/FoodItem";
import SaveIcon from '@mui/icons-material/Save';
import styled from 'styled-components';
import { getLocalAuthToken } from "../../utils/auth";

type FoodDisplayComponentProps = {
    foodItem: FoodItemDisplay;
    blockId: number;
    handleUpdates: () => void
}

const MainLabelDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const DisplayWrapper = styled.div`
    display: flex;
    align-items: end;
`;

export const FoodDisplayProComponent = ({ foodItem, blockId, handleUpdates }: FoodDisplayComponentProps) => {
    const [ editMode, setEditMode ] = useState(false);
    const [ quantity, setQuantity ] = useState("");

    useEffect(() => {
        setQuantity(foodItem.quantity.toString());
      }, []);

    const handleSave = async () => {
        const res = await fetch(`http://localhost:3002/api/planner/amount-update/${ foodItem.id }`, {
            method: 'PATCH',
            headers: {
            'Authorization': 'Bearer' + getLocalAuthToken(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
           });
        console.log(res);
        setEditMode(false);
        handleUpdates();
    }

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:3002/api/planner/${ blockId }/${ foodItem.id }`, {
            method: 'PATCH',
            headers: {
            'Authorization': 'Bearer' + getLocalAuthToken(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
           });
        console.log(res);
        handleUpdates();
    }
    
    return (
        <Accordion sx={{ width: '100%'}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}>
                { (editMode) ? 
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%'}} onClick={e => e.stopPropagation()}>
                        <TextField 
                            sx={{ width: '60px', marginRight: '20px', textAlign: 'center'}}
                            key="quantity"  
                            variant="outlined" 
                            value={ quantity }
                            onChange={ e => setQuantity(e.target.value)}
                        />
                        <Typography sx={{ margin: 'revert'}}>{ `${foodItem.measureLabel} ${foodItem.name}`}</Typography>
                    </Box> : 
                    <MainLabelDiv>
                        <Typography component="div">{ `${foodItem.quantity} ${foodItem.measureLabel} ${foodItem.name}`}</Typography>
                        <Chip sx={{ marginRight: '20px'}} label={`${foodItem.nutritionalInfo.calories}`} color="primary" variant="outlined"/>
                    </MainLabelDiv>
                }    
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <DisplayWrapper>
                    <SmallNutrientDisplay macros={ foodItem.nutritionalInfo } />
                </DisplayWrapper>
                <Box sx={{ marginLeft: '40px'}}>
                    { (editMode) ? <SaveIcon onClick={handleSave} sx={{ fontSize: '30px', cursor: 'pointer'}} color='action'/> :
                        <>
                            <EditIcon onClick={() => setEditMode(true)} sx={{ fontSize: '30px', cursor: 'pointer'}} color='action'/>
                            <DeleteForeverIcon onClick={ handleDelete } sx={{ fontSize: '30px', cursor: 'pointer', marginLeft: '10px'}} color='action'/>
                        </>
                    }
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}