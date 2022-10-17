import styled from "styled-components";

export const FirstContainer = styled.div`
  height: 100%;
  background: #1a1a40;
  display: flex;
  flex-direction: column;
  align-items: start;

  padding: ${(props: any) => {
    const sizes = props.theme.sizes;

    return `${sizes.medium1} ${sizes.medium4} 0px ${sizes.medium4}`;
  }};

  @media (${(props) => props.theme.media.md}) {
    padding: ${(props: any) => {
    const sizes = props.theme.sizes;

    return `${sizes.medium1} ${sizes.xlarge1} 0px ${sizes.xlarge1}`;
  }};
  }
`;

export const SecondContainer = styled.div`
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: ${(props: any) => {
    const sizes = props.theme.sizes;

    return `${sizes.medium1} ${sizes.xlarge1} 0px ${sizes.xlarge1}`;
  }};
`;

export const Footer = styled.footer`
  height: 100%;
  background: #1a1a40;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px 0;

  @media (${(props) => props.theme.media.md}) {
    padding: 40px 0;
  }
`;

export const FooterText = styled.h1`
  font-family: "Circular Std";
  font-style: normal;
  font-size: 12px;
  line-height: 25px;
  color: #ffffff;
  background: #1a1a40;
`;

