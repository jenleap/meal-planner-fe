import { blue, neutral } from "./colors";
import { primaryFont } from "./typography";

export const defaultTheme = {
    primaryColor: blue[300],
    primaryColorHover: blue[200],
    primaryColorActive: blue[100],
    textColorOnPrimary: neutral[100],
    textColor: neutral[600],
    textColorInverted: neutral[100],
    disabled: neutral[400],
    textOnDisabled: neutral[300],
    formElementBackground: neutral[100],
    textOnFormElementBackground: neutral[600],
    primaryFont
};

export const darkTheme = {
    primaryColor: neutral[100],
    primaryColorHover: neutral[200],
    primaryColorActive: neutral[300],
    textColorOnPrimary: blue[300],
    textColor: blue[300],
    textColorInverted: neutral[100],
    disabled: neutral[400],
    textOnDisabled: neutral[300],
    formElementBackground: blue[100],
    textOnFormElementBackground: neutral[100],
    primaryFont
};