import React, { useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Food } from '../../interfaces/Food';
import { MeasuredFood } from '../../interfaces/MeasuredFood';
import FoodList from './food-list.component';
import FoodQuantitySelector from './food-quantity-selector';
import SearchIcon from '@mui/icons-material/Search';

type FoodSelectorProps = {
    selectFood: (measuredFood: MeasuredFood) => void;
}

const FoodSelector = ({ selectFood }: FoodSelectorProps) => {
    const [selectedFood, setFood] = useState<Food | undefined>(undefined);
    const [query, setQuery] = useState('');

    const addFood = (measuredFood: MeasuredFood) => {
        selectFood(measuredFood);
        setFood(undefined);
    }

    const searchFoods = () => {

    }

    const onFoodSelected = (selected: Food) => {
        setFood(selected);
    }


    return (
        <Card className="p-2 mt-3 mb-3">
            {(selectedFood) ? (
                <Row>
                    <FoodQuantitySelector food={ selectedFood } addFood={ addFood } />
                </Row>
            ) : (
                <Col>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control 
                                type="text"
                                value={ query }
                                onChange={(e) => setQuery(e.target.value)}>    
                            </Form.Control>
                        </Col>
                        <Button variant="primary" onClick={() => searchFoods()}><SearchIcon /></Button>
                    </Row>
                    <Col>
                        <FoodList 
                            query={ query } 
                            foodSelected={ onFoodSelected }
                        />
                    </Col>
                </Col>
            )}
        </Card>
    )
}

export default FoodSelector;
