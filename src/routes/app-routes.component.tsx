import { Route, Routes } from "react-router-dom";
import FoodList from "../components/foods/food-list.component";
import FoodCreate from "../components/foods/food-create.component";
import FoodPage from "./food-page.component";
import { Home } from "./home.component";
import AuthPage from "./auth-page.component";
import SignIn from "../components/auth/sign-in.component";
import { useLogout } from '../components/auth/log-out.component';
import RecipePage from "./recipe-page.component";
import CreateRecipe from "../components/recipes/recipe-create.component";
import RecipeList from "../components/recipes/recipe-list.component";
import RecipeDetail from "../components/recipes/recipe-detail.component";
import PlannerCreate from "../components/planner/planner-create.component";
import PlannerPage from "./planner-page.component";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="auth" element={ <AuthPage />}>
                <Route index element={ <SignIn />} />
                <Route path="register" element={ <FoodCreate />} />
                <Route path="logout" action={ useLogout } />
            </Route>
            <Route path="foods" element={ <FoodPage />}>
                <Route index element={ <FoodCreate />} />
                <Route path="create" element={ <FoodCreate />} />
            </Route>
            <Route path="recipes" element={ <RecipePage />}>
                <Route index element={ <RecipeList />} />
                <Route path=":recipeId" element={ <RecipeDetail />} />
                <Route path="create" element={ <CreateRecipe />} />
            </Route>
            <Route path="planner" element={ <PlannerPage />}>
                <Route index element={ <PlannerCreate />} />
                <Route path="create" element={ <PlannerCreate />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;