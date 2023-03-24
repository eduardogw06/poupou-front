import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #1a1a40;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${(props: any): string => `${props.theme.sizes.medium3} ${props.theme.sizes.none}`};

  @media (${(props: any): string => props.theme.media.md}) {
    padding: ${(props: any): string => `${props.theme.sizes.large3} ${props.theme.sizes.none}`};
  }
`;

const FooterText = styled.h1`
  font-family: "Circular Std";
  font-style: normal;
  font-size: 12px;
  line-height: 25px;
  color: #ffffff;
  background: #1a1a40;
`;

export { FooterContainer, FooterText }