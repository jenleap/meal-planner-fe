import React, { useEffect, useState } from 'react';
import { Row, Col, Image, ListGroup, Button, Card, Table } from 'react-bootstrap';

import Loader from '../common/Loader';
import Message from '../common/Message';
import FractionDisplay from '../common/FractionDisplay';
import { useParams } from 'react-router-dom';
import { Recipe } from '../../interfaces/Recipe';
import SmallNutrientDisplay from '../foods/SmallNutrientDisplay';


const RecipeDetail = () => {
    const [ recipe, setRecipe ] = useState<Recipe | undefined>(undefined);
    const [ error, setError ] = useState("");
    const { recipeId } = useParams();

    useEffect(() => {
       getRecipe()
    }, []);

    async function getRecipe() {
        const res = await fetch(`http://localhost:3002/api/recipes/${ recipeId }`);
        const json = await res.json();
        setRecipe(json);
        console.log(recipe, json);
    }

    return (
        <div>
            { (recipe == undefined) ? <Loader />
                : error ? <Message variant="danger">{ error }</Message>
                    :
                    <Row>
                        <Col md={4}>
                            <Card>
                                <Card.Header>{ recipe.name }</Card.Header>
                                <Card.Img src={`http://localhost:3002/api/recipes/image/${recipe.imagePath}`} className="rounded-0" />
                                <Card.Body>{ recipe.description }</Card.Body>
                            </Card>
                            <Card className="p-2 mt-3">
                                <h4>Nutritional Info</h4>
                                <p>Per serving</p>
                                <Table>
                                    <tbody>
                                        { (recipe.nutritionalInfo) && (
                                            <SmallNutrientDisplay 
                                                calories={ recipe.nutritionalInfo.calories }
                                                protein={ recipe.nutritionalInfo.protein }
                                                carbs={ recipe.nutritionalInfo.carbs }
                                                fat={ recipe.nutritionalInfo.fat }
                                            /> 
                                        )}
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <h3>Ingredients</h3>
                            <ListGroup>
                                { (recipe.ingredients) ? (recipe.ingredients.map(i => (
                                    <ListGroup.Item key={i.id}>
                                        <p className="text-lowercase">
                                            <FractionDisplay decimalNum={i.quantity}/> 
                                            &nbsp; { i.measureLabel } { i.name }</p>
                                    </ListGroup.Item>
                                ))) : null}
                            </ListGroup>
                            <h3>Steps</h3>
                            <ListGroup>
                                { (recipe.steps) ? (recipe.steps.map(s => (
                                    <ListGroup.Item key={s.id}>
                                        <p>{ s.order }. { s.instruction }</p>
                                    </ListGroup.Item>
                                ))) : null}
                            </ListGroup>
                        </Col>
                    </Row>
            }
        </div>
    )
}

export default RecipeDetail;
