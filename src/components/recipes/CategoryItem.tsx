import styled from 'styled-components';

type CatItemProps = {
    title: string,
    image: string
}

type CatContainerProps = {
    image: string
}

const CatItemContainer = styled.div<CatContainerProps>`
    background-image: url(${props => require(`../../assets/images/${props.image}`)});
    background-position: center;
    background-size: cover;
    width: 200px;
    height: 200px;
    display: inline-block;
    margin: 20px;
`;

const CatItemInnerDiv = styled.div`
    padding: 20px;
    background-color: white;
    opacity: 0.85;
    margin: 20px 5px;
    text-align: center;
`;

const CategoryItem = ({ title, image}: CatItemProps) => {
    return (
        <CatItemContainer image={ image }>
            <CatItemInnerDiv>{ title }</CatItemInnerDiv>
        </CatItemContainer>
    );
}

export default CategoryItem;