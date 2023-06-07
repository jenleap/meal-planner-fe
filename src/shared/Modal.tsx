import { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { useSpring, animated, config } from 'react-spring';

type ModalProps = {
    showModal: boolean,
    closeModal: React.MouseEventHandler
};

const ModalBackground = styled.div`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0,0.5);
`;

const ModalBody = styled.div`
    background-color: ${ props => props.theme.formElementBackground };
    color: ${ props => props.theme.textOnFormElementBackground }
    margin: 10% auto;
    padding: 20px;
    width: 50%;
    box-shadow: 0 5px 16px rgba(0,0,0, 0.2);
    position: relative;
`;

const CloseModalButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    position: absolute;
    right: 40px;
    top: 40px;
    width: 24px;
    height: 24px;
    padding: 0;
`;

export const Modal = ({ showModal, closeModal, children }: PropsWithChildren<ModalProps>) => {
    //const [showModal, setShowModal ] = useState(false);

    const animationBody = useSpring({
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0)` : `translateY(-200%)`,
        config: config.slow
    });

    const animationBackground = useSpring({
        opacity: showModal ? 1 : 0
    });


    return (
        <>
        { showModal && (<animated.div style={ animationBackground }>
                <ModalBackground onClick={closeModal}>
                    <animated.div style={ animationBody }>
                        <ModalBody onClick={e => e.stopPropagation()}>
                            <CloseModalButton onClick={closeModal}>
                                <CloseIcon />
                            </CloseModalButton>
                                { children }
                        </ModalBody>
                    </animated.div>
                </ModalBackground>
            </animated.div>
        )}
        </>
    )
}