import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../components/auth/auth.context';

const HeaderWrapper = styled.header`
    background-color: gray;

`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px:
    padding: 20px;
    max-width: 1200px;
    margin: auto;
    color: white;
    text-decoration: none;
`;

const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
`;



export const Header = () => {
    const { authToken } = useContext(AuthContext);
    return (
        <HeaderWrapper>
            <HeaderContainer>
                <Link to={ "/" }>
                    <h2>Nutri App</h2>
                </Link>
                        <NavBar>
                            <Link to={ "foods" }>
                                <h3>Foods</h3>
                            </Link>
                            <Link to={ "recipes" }>
                                <h3>Recipes</h3>
                            </Link>
                            <Link to={ "planner" }>
                                <h3>Planner</h3>
                            </Link>
                            <Link to={ "/logout" }>
                                <h3>Log Out</h3>
                            </Link>
                        </NavBar>
                
            </HeaderContainer>
        </HeaderWrapper>
    )
}