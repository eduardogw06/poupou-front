import styled from "styled-components";

const getButtonSize = (size: "small" | "medium" | "large"): string => {
    const sizes = { small: "20px", medium: "35px", large: "50px" }

    return sizes[size];
}

const StyledButton = styled.div < {
    size: "small" | "medium" | "large";
    fullWidth?: boolean;
    outlined?: boolean;
}>`

    background: ${(props: any): string => props.outlined ? "rgba(0, 0, 0, -0.5)" : props.theme.colors.tertiary};
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

    font-family: "Work Sans";
    font-weight: 500;
    font-size: 10px;
    color: ${(props: any): string => props.outlined ? props.theme.colors.text : props.theme.colors.buttonText};
    text-decoration: none;

    &:hover {
    background: ${(props: any): string => props.outlined ? "rgba(0, 0, 0, -0.5)" : props.theme.colors.quaternary};
    border: ${(props: any): string => props.outlined ? `1px solid ${props.theme.colors.tertiary}` : "0px"};
    color: ${(props: any): string => props.outlined ? `${props.theme.colors.tertiary}` : "#ffffff"};
}



@media(${(props) => props.theme.media.md}) {
    height: 40px;
    width:${(props: any): string => props.fullWidth ? "100%" : "160px"};
    font-size: 16px;
}
`

export { StyledButton }