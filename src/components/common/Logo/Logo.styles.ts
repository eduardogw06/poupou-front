import styled from "styled-components";

const LogoIcon = styled.img<{
  showImage: boolean;
}>`
  margin-right: ${(props: any): string => props.theme.sizes.medium2};
  width: 80px;
  height: 80px;
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
    font-size: 40px;
    font-weight: bold;
    display: flex;
    align-items: center;
    color: #ffffff;   
`;

export { LogoIcon, LogoContainer, LogoName }