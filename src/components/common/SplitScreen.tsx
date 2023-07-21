import styled from 'styled-components';

type PaneProps = {
    weight: number;
}

const Container = styled.div`
    display: flex;
`;

const Pane = styled.div<PaneProps>`
    flex: ${ props => props.weight };
`;

export const SplitScreen = ({
    children,
    leftWeight = 1,
    rightWeight = 1,
}: any) => {
    const [ left, right ] = children;
    return (
        <Container>
            <Pane weight={ leftWeight }>
                { left }
            </Pane>
            <Pane weight={ rightWeight }>
                { right }
            </Pane>
        </Container>
    )
}