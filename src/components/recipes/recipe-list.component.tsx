import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Recipe } from '../../interfaces/Recipe';
import Paginate from '../common/Paginate';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';

type RecipeListProps = {
    query?: string;
}

const RecipeContainerDiv = styled.div`
    padding: 20px;
`;

const Item = styled.div`
    flex-grow: 1;
    width: 200px;
`;

const IconWrapper = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
  
export const RecipeList = ({ query }: RecipeListProps) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ page, setPage ] = useState(0);

    useEffect(() => {
      getRecipes();
    }, []);

    async function getRecipes() {
        const res = await fetch('http://localhost:3002/api/recipes');
        const json = await res.json();
        setRecipes(json.recipes);
        setTotalPages(json.totalPages);
    }

    const searchRecipes = (selectedPage = 1) => {
        
    }

    return (
        <RecipeContainerDiv>
            <Typography sx={{ fontSize: '16px', textTransform: 'uppercase'}}>All Recipes</Typography>
             <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                        {recipes.map(recipe => (
                            <Item>
                                <Link to={`/recipes/${ recipe.id }`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <ListItemIcon>
                                    {(recipe.imagePath) ? 
                                        <img 
                                            alt={ recipe.name } 
                                            style={{ width: '100px', height: '100px'}}
                                            src={`http://localhost:3002/api/recipes/image/${recipe.imagePath}`} /> : 
                                        <IconWrapper>
                                            <RestaurantIcon sx={{ fontSize: '60px'}} />
                                        </IconWrapper>
                                    }
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: 'gray', textTransform: 'uppercase'}} secondary={ recipe.name } />
                                </Link>
                            </Item>
                            ))
                        }
                </Stack>
            </Box>
            <Paginate 
                totalPages={totalPages}
                page={page}
                itemCall={searchRecipes}
            />
      </RecipeContainerDiv> 
    );
}
  
export default RecipeList;