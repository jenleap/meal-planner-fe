import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Recipe } from '../../interfaces/Recipe';
import RestaurantIcon from '@mui/icons-material/Restaurant';

type RecipeItemProps = {
    recipe: Recipe
}

const RecipeItem = ({ recipe }: RecipeItemProps) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/recipe/${ recipe.id }`}>
                {
                    (recipe.imagePath) ? 
                        <Card.Img src={ recipe.imagePath } /> : 
                        <span><RestaurantIcon /></span>
                }
            </Link>
            <Card.Body>
                <Link to={`/recipes/${recipe.id}`}>
                    <Card.Title as='div'>
                        <strong>{ recipe.name }</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default RecipeItem;
