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
`;
