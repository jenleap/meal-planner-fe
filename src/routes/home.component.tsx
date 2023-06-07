import { catList } from "../utils/dummy"
import CategoryItem from "../components/recipes/CategoryItem"
import styled from 'styled-components';

const MainContainer = styled.div`
    width: 80%;
    margin: auto;
`;

export const Home = () => {
    return (
        <MainContainer>
            <h1>Home</h1>
            {
                catList.map(cat => {
                    return (
                        <CategoryItem
                            key={ cat.title }
                            title={ cat.title }
                            image={ cat.image }
                        />
                    )
                })
            }
        </MainContainer>
    )
}