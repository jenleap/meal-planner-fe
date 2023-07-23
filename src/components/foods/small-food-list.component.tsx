import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Food } from '../../interfaces/Food';
import Paginate from '../common/Paginate';
import FoodItem from './food-item.component';
import { List, ListItem, ListItemText } from '@mui/material';

type FoodListProps = {
    query?: string;
    foodSelected: (selected: Food) => void;
}

const FoodContainerDiv = styled.div`
`;
  
export const SmallFoodList = ({ query, foodSelected }: FoodListProps) => {
    const [foods, setFoods] = useState<Food[]>([]);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ page, setPage ] = useState(0);

    useEffect(() => {
      getFoods();
    }, []);

    async function getFoods() {
        const res = await fetch('http://localhost:3002/api/foods');
        const json = await res.json();
        setFoods(json.foods);
        setTotalPages(json.totalPages);
    }

    const searchFoods = (selectedPage = 1) => {
        
    }

    const getSecondaryLabel = (food: Food) => {
        const measure = `${ food.measures[0].quantity } ${ food.measures[0].label }`;
        if (food.brand.length > 0 && food.brand !== 'generic') {
            return `${ food.brand }, ${measure}`;
        } else {
            return measure;
        }
    }

    return (
        <FoodContainerDiv>
             <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    foods.map(food => (
                        <ListItem 
                            key={ `${ food.name }-${ food.brand }`} 
                            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'lightgray'} }}
                            onClick={ () => foodSelected(food)}
                        >
                            <ListItemText primary={ food.name } secondary={ getSecondaryLabel(food)} />
                        </ListItem>
                    ))
                }
            </List>
            <Paginate 
                totalPages={totalPages}
                page={page}
                itemCall={searchFoods}
            />
      </FoodContainerDiv> 
    );
}
  
export default SmallFoodList;