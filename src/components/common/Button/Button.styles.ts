import { darken } from "polished";
import styled from "styled-components";

const getButtonSize = (size: "small" | "medium" | "large"): string => {
    const sizes = { small: "20px", medium: "35px", large: "50px" }

    return sizes[size];
}

const StyledButton = styled.button < {
    size: "small" | "medium" | "large";
    fullWidth?: boolean;
    outlined?: boolean;
    disabled?: boolean;
}>`

    background: ${(props: any): string => (props.disabled ? "grey" : (props.outlined ? "rgba(0, 0, 0, -0.5)" : props.theme.colors.tertiary))};
    border-radius: 10px;
    height: ${(props: any) => getButtonSize(props.size)};
    width: ${(props: any): string => props.fullWidth ? "100%" : "100px"};
    border: ${(props: any): string => props.outlined ? `1px solid ${props.theme.colors.text}` : "0px"};
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: ${(props: any): string => props.theme.sizes.medium2};
    font-family: "Circular Medium";
    font-size: 16px;
    color: ${(props: any): string => (props.disabled ? darken('0.65', '#FFF') : (props.outlined ? props.theme.colors.text : props.theme.colors.buttonText))};
    text-decoration: none;

    &:hover {
        background: ${(props: any): string => (props.disabled ? "grey" : (props.outlined ? "rgba(0, 0, 0, -0.5)" : props.theme.colors.quaternary))};
        border: ${(props: any): string => props.outlined ? `1px solid ${props.theme.colors.tertiary}` : "0px"};
        color: ${(props: any): string => (props.disabled ? darken('0.65', '#FFF') : (props.outlined ? `${props.theme.colors.tertiary}` : "#FFF"))};
    }



    @media(${(props) => props.theme.media.md}) {
        height: 40px;
        width:${(props: any): string => props.fullWidth ? "100%" : "160px"};
    }
`

const ButtonContainer = styled.div`
    position: relative;
    &:span {
        margin-top: -24px;
        border: 1px solid red
    }
`

export { StyledButton, ButtonContainer }