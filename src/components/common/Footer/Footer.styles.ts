import styled from "styled-components";

const FooterContainer = styled.footer`
  height: 100%;
  background: #1a1a40;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px 0;

  @media (${(props: any): string => props.theme.media.md}) {
    padding: 40px 0;
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