import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Recipe } from '../../interfaces/Recipe';
import Paginate from '../common/Paginate';
import RecipeItem from './recipe-item.component';

type RecipeListProps = {
    query?: string;
}

const RecipeContainerDiv = styled.div`
`;
  
export const RecipeList = ({ query }: RecipeListProps) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ page, setPage ] = useState(0);

    useEffect(() => {
      getRecipes();
    }, []);

    async function getRecipes() {
        const res = await fetch('http://localhost:3000/api/recipes');
        const json = await res.json();
        setRecipes(json.recipes);
        setTotalPages(json.totalPages);
    }

    const searchRecipes = (selectedPage = 1) => {
        
    }

    return (
        <RecipeContainerDiv>
            {
                recipes.map(recipe => (
                    <RecipeItem 
                        key={ recipe.id }
                        recipe={ recipe }
                    />
                ))
            }
            <Paginate 
                totalPages={totalPages}
                page={page}
                itemCall={searchRecipes}
            />
      </RecipeContainerDiv> 
    );
}
  
export default RecipeList;