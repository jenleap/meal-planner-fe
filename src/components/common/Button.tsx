import styled from 'styled-components';
import { typeScale } from "../../utils";
import { applyStyleModifiers } from 'styled-components-modifiers';

export const BUTTON_MODIFIERS = {
    small: () => `
        font-size: ${ typeScale.helperText };
        padding: 8px;
    `,
    large: () => `
        font-size: ${ typeScale.header5 };
        padding: 16px 24px;
    `
};

export const Button = styled.button`
    padding: 12px 24px;
    font-size: ${ typeScale.paragraph };
    border-radius: 2px;
    min-width: 100px;
    cursor: pointer;
    font-family: "Roboto Mono", monospace;
    transition: background-color 0.2s linear, color 0.2s linear;

    &:hover {
        background-color: ${props => props.theme.primaryColorHover };
        color: ${ props => props.theme.textColorOnPrimary };
    }

    &:focus {
        outline: 3px solid ${ props => props.theme.primaryColorHover };
        outline-offset: 2px;
    }

    &:active {
        background-color: ${ props => props.theme.primaryColorActive };
        border-color: ${ props => props.theme.primaryColorActive };
        color: ${ props => props.theme.textColorOnPrimary };
    }
`;

export const PrimaryButton = styled(Button as any)`
    background-color: ${ props => props.theme.primaryColor };
    border: none;
    color: white;

    &:disabled {
        background-color: ${ props => props.theme.disabled };
        color: ${ props => props.theme.textOnDisabled };
        cursor: not-allowed;
    }

    ${ applyStyleModifiers(BUTTON_MODIFIERS) }
`;

export const SecondaryButton = styled(Button as any)`
    background-color: none;
    border: 1px solid ${ props => props.theme.primaryColor };
    color: ${ props => props.theme.primaryColor };

    &:disabled {
        background-color: none;
        color: ${ props => props.theme.disabled };
        border-color: ${ props => props.theme.disabled };
        cursor: not-allowed;
    }

    ${ applyStyleModifiers(BUTTON_MODIFIERS) }
`;
