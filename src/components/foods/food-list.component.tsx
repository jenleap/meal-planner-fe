import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Food } from '../../interfaces/Food';
import Paginate from '../common/Paginate';
import FoodItem from './food-item.component';

type FoodListProps = {
    query?: string;
    foodSelected: (selected: Food) => void;
}

const FoodContainerDiv = styled.div`
`;
  
export const FoodList = ({ query, foodSelected }: FoodListProps) => {
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

    return (
        <FoodContainerDiv>
            {
                foods.map(food => (
                    <FoodItem 
                        key={ `${ food.name }-${ food.brand }`}
                        food={ food }
                        foodSelected={ foodSelected }
                    ></FoodItem>
                ))
            }
            <Paginate 
                totalPages={totalPages}
                page={page}
                itemCall={searchFoods}
            />
      </FoodContainerDiv> 
    );
}
  
export default FoodList;