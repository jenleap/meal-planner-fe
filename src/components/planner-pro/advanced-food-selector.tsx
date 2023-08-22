import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabPanel } from "../common/tab-panel.component";
import SimpleFoodSelector from "../foods/simple-food-selector.component";
import SimpleMealSelector from "../meals/simple-meal-selector";
import SimpleRecipeSelector from "../recipes/simple-recipe-selector.component";
import { MeasuredFood } from "../../interfaces/MeasuredFood";
import { Meal } from "../../interfaces/Meal";
import { Recipe } from "../../interfaces/Recipe";
import { getLocalAuthToken } from "../../utils/auth";
import { Food } from "../../interfaces/Food";

const tabsArray = [ 'Foods', 'Meals', 'Recipes'];

type FoodSelectorProps = {
    addFood: (item: MeasuredFood) => void
}

export const AdvancedFoodSelector = ({ addFood }: FoodSelectorProps) => {
    const [ selectedTab, setSelectedTab ] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
        setSelectedTab(newTab);
      };

    const handleSelectFood = (item: MeasuredFood) => {
        addFood(item);
    }

    const handleSelectMeal = (item: Meal) => {
        console.log(item);
        item.mealItems.forEach(i => {
            const newFood: MeasuredFood = {
                food: i.food!,
                label: i.measureLabel,
                quantity: i.quantity,
                measureId: i.measureId
            };
            addFood(newFood);
        })
    }

    const handleSelectRecipe = async (item: Recipe) => {
        const response = await fetch(`http://localhost:3002/api/foods/recipes/${ item.id }`);

        const json = await response.json();
        console.log(json);
        const newFoodRecipe: MeasuredFood = {
            food: json.food,
            label: json.food.measures[0].label,
            quantity: 1,
            measureId: json.food.measures[0].id,
        };
        addFood(newFoodRecipe);
    }
    
    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={ selectedTab } onChange={ handleTabChange } aria-label="tab container">
                      {
                        tabsArray.map((tab => (
                          <Tab key={`tab-${tab}`} label={ tab } id={`tab-${tab}`}  />
                        ))
                      )}
                    </Tabs>
                    <TabPanel value={ selectedTab } index={ 0 }>
                        <SimpleFoodSelector selectFood={ handleSelectFood }></SimpleFoodSelector>
                    </TabPanel>
                    <TabPanel value={ selectedTab } index={ 1 }>
                        <SimpleMealSelector selectMeal={ handleSelectMeal }></SimpleMealSelector>
                    </TabPanel>
                    <TabPanel value={ selectedTab } index={ 2 }>
                        <SimpleRecipeSelector selectRecipe={ handleSelectRecipe }></SimpleRecipeSelector>
                    </TabPanel>
            </Box>
        </>
    )
}