import styled from "styled-components";

const LogoIcon = styled.img<{
  showImage: boolean;
}>`
  margin-right: ${(props: any): string => props.theme.sizes.medium2};
  width: ${(props: any): string => props.theme.sizes.xlarge3};
  height: ${(props: any): string => props.theme.sizes.xlarge3};
  display: ${(props: any): "none" | "flex" =>
    props.showImage ? "flex" : "none"};
`;

const LogoContainer = styled.div<{
  imageSide?: "right" | "bottom";
}>`
    display: flex;
    flex-direction: ${(props: any): "row" | "column" =>
    props.imageSide === "right" ? "row" : "column"};
    align-items: center;
    cursor: pointer;
`;

const LogoName = styled.h1`
    font-family: "Work Sans";
    font-size: ${(props: any): string => props.theme.sizes.large3};
    font-weight: bold;
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.text};   
`;

export { LogoIcon, LogoContainer, LogoName }