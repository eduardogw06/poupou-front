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

    @font-face {
        font-family: "Work Sans",
        src:local("Work Sans"), 
        url("../fonts/WorkSans/WorkSans-Black.ttf") format("ttf")
        url("../fonts/WorkSans/WorkSans-BlackItalic.ttf") format("ttf")
        url("../fonts/WorkSans/WorkSans-Bold.ttf") format("ttf")
        url("../fonts/WorkSans/WorkSans-BoldItalic.ttf") format("ttf")
        url("../fonts/WorkSans/WorkSans-ExtraBold.ttf") format("ttf")
        url("../fonts/WorkSans/WorkSans-ExtraBoldItalic.ttf") format("ttf")
        url("../fonts/WorkSans/WorkSans-Light.ttf") format("ttf")
        url("../fonts/WorkSans/WorkSans-LightItalic.ttf") format("ttf")
        url("../fonts/WorkSans/WorkSans-Medium.ttf") format("ttf")
        url("../fonts/WorkSans/WorkSans-MediumItalic.ttf") format("ttf")
        url("../fonts/WorkSans/WorkSans-Regular.ttf") format("ttf")
        url("../fonts/WorkSans/WorkSans-Italic.ttf") format("ttf")
        url("../fonts/WorkSans/WorkSans-SemiBold.ttf") format("ttf")
        url("../fonts/WorkSans/WorkSans-SemiBoldItalic.ttf") format("ttf");
    }
`;
