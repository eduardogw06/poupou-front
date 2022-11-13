import { createGlobalStyle, ThemeProps } from "styled-components";
import { DefaultTheme } from "../types/DefaultTheme";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        background: ${(props: ThemeProps<DefaultTheme>) =>
          props.theme.colors.primary};
    }

    @font-face {
        font-family: 'Circular Std';
        src:local("Circular Std"), 
        url("../fonts/Circular/CircularStd-Black.otf") format("otf")
        url("../fonts/Circular/CircularStd-BlackItalic.otf") format("otf")
        url("../fonts/Circular/CircularStd-Bold.otf") format("otf")
        url("../fonts/Circular/CircularStd-BoldItalic.otf") format("otf")
        url("../fonts/Circular/CircularStd-Book.otf") format("otf")
        url("../fonts/Circular/CircularStd-BookItalic.otf") format("otf")
        url("../fonts/Circular/CircularStd-Light.otf") format("otf")
        url("../fonts/Circular/CircularStd-LightItalic.otf") format("otf")
        url("../fonts/Circular/CircularStd-Medium.otf") format("otf")
        url("../fonts/Circular/CircularStd-MediumItalic.otf") format("otf");
    }
`;
