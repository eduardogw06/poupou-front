import { createGlobalStyle, ThemeProps } from "styled-components";
import { DefaultTheme } from "../types/DefaultTheme";
import { lighten } from "polished";

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

    // Select dropdown
    .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper {
        background-color: ${(props) => props.theme.colors.primary} !important;
        color: ${(props) => props.theme.colors.text} !important;
        max-height: 200px;

        ul > li {
            &:hover {
                background-color: ${(props) =>
                  lighten(0.15, props.theme.colors.secondary)};
            }
        }
        
    }

    // Selected Tab
    .css-zx9imm-MuiButtonBase-root-MuiTab-root.Mui-selected, .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
        border-radius: 8px;
        background-color: ${(props) => props.theme.colors.tertiary};
    }

    .DraftEditor-editorContainer{
        background-color: #FFF;
    }

    @font-face {
        font-family: 'WorkSans Black';
        src: local("WorkSans"),
        url("/fonts/WorkSans/WorkSans-Black.ttf") format('truetype');
    }

    @font-face {
        font-family: 'WorkSans BlackItalic';
        src: local("WorkSans"), 
        url("/fonts/WorkSans/WorkSans-BlackItalic.ttf") format('truetype');
    }

    @font-face {
        font-family: 'WorkSans BoldItalic';
        src: local("WorkSans"), 
        url("/fonts/WorkSans/WorkSans-BoldItalic.ttf") format('truetype');
    }

    @font-face {
        font-family: 'WorkSans Bold';
        src: local("WorkSans"), 
        url("/fonts/WorkSans/WorkSans-Bold.ttf") format('truetype');
    }

    @font-face {
        font-family: 'WorkSans ExtraBold';
        src: local("WorkSans"), 
        url("/fonts/WorkSans/WorkSans-ExtraBold.ttf") format('truetype');
    }
    
    @font-face {
        font-family: 'WorkSans ExtraBoldItalic';
        src: local("WorkSans"), 
        url("/fonts/WorkSans/WorkSans-ExtraBoldItalic.ttf") format('truetype');
    }

    @font-face {
        font-family: 'WorkSans Light';
        src: local("WorkSans"), 
        url("/fonts/WorkSans/WorkSans-Light.ttf") format('truetype');
    }

    @font-face {
        font-family: 'WorkSans LightItalic';
        src: local("WorkSans"), 
        url("/fonts/WorkSans/WorkSans-LightItalic.ttf") format('truetype');
    }

    @font-face {
        font-family: 'WorkSans Medium';
        src: local("WorkSans"), 
        url("/fonts/WorkSans/WorkSans-Medium.ttf") format('truetype');
    }
    
    @font-face {
        font-family: 'WorkSans MediumItalic';
        src: local("WorkSans"), 
        url("/fonts/WorkSans/WorkSans-MediumItalic.ttf") format('truetype');
    }

    @font-face {
        font-family: 'WorkSans Regular';
        src: local("WorkSans"), 
        url("/fonts/WorkSans/WorkSans-Regular.ttf") format('truetype');
    }

    @font-face {
        font-family: 'WorkSans Italic';
        src: local("WorkSans"), 
        url("/fonts/WorkSans/WorkSans-Italic.ttf") format('truetype');
    }

    @font-face {
        font-family: 'WorkSans SemiBold';
        src: local("WorkSans"), 
        url("/fonts/WorkSans/WorkSans-SemiBold.ttf") format('truetype');
    }
    
    @font-face {
        font-family: 'WorkSans SemiBoldItalic';
        src: local("WorkSans"), 
        url("/fonts/WorkSans/WorkSans-SemiBoldItalic.ttf") format('truetype');
    }


    @font-face {
        font-family: 'Circular';
        src: local("Circular"), 
        url("/fonts/Circular/CircularStd-Black.otf") format("opentype") 
    }

    @font-face {
        font-family: 'Circular BlackItalic';
        src: local("Circular"), 
        url("/fonts/Circular/CircularStd-BlackItalic.otf") format("opentype");
    }

    @font-face {
        font-family: 'Circular Bold';
        src: local("Circular"), 
        url("/fonts/Circular/CircularStd-Bold.otf") format("opentype");
    }

    @font-face {
        font-family: 'Circular BoldItalic';
        src: local("Circular"), 
        url("/fonts/Circular/CircularStd-BoldItalic.otf") format("opentype");
    }

    @font-face {
        font-family: 'Circular Book';
        src: local("Circular"), 
        url("/fonts/Circular/CircularStd-Book.otf") format("opentype");
    }

    @font-face {
        font-family: 'Circular BookItalic';
        src: local("Circular"), 
        url("/fonts/Circular/CircularStd-BookItalic.otf") format("opentype");
    }

    @font-face {
        font-family: 'Circular Light';
        src: local("Circular"), 
        url("/fonts/Circular/CircularStd-Light.otf") format("opentype");
    }

    @font-face {
        font-family: 'Circular LightItalic';
        src: local("Circular"), 
        url("/fonts/Circular/CircularStd-LightItalic.otf") format("opentype");
    }

    @font-face {
        font-family: 'Circular Medium';
        src: local("Circular"), 
        url("/fonts/Circular/CircularStd-Medium.otf") format("opentype");
    }

    @font-face {
        font-family: 'Circular MediumItalic';
        src: local("Circular"), 
        url("/fonts/Circular/CircularStd-MediumItalic.otf") format("opentype");
    }
    
`;
