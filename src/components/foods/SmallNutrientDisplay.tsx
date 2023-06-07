import { Divider, Stack } from '@mui/material';
import styled from 'styled-components';
import { NutrientGroup } from '../../interfaces/NutrientGroup';


const NutrientDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
  
export const SmallNutrientDisplay = (props: NutrientGroup) => {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
        >
            <NutrientDiv>
                <span>{ props.calories }</span>
                <span>Calories</span>
            </NutrientDiv>
            <NutrientDiv>
                <span>{ props.protein }</span>
                <span>Protein (g)</span>
            </NutrientDiv>
            <NutrientDiv>
                <span>{ props.carbs }</span>
                <span>Carbs (g)</span>
            </NutrientDiv>
            <NutrientDiv>
                <span>{ props.fat }</span>
                <span>Fat (g)</span>
            </NutrientDiv>
        </Stack>
    );
}
  
export default SmallNutrientDisplay;