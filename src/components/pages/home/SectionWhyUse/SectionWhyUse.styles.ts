import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 24px;

  @media (${(props: any): string => props.theme.media.sm}) {
    padding-bottom: 20px;
  }
`;

export const Title = styled.h1`
  font-family: "Circular Std";
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  color: #fa58b6;

  @media (${(props) => props.theme.media.md}) {
    font-size: 48px;
    line-height: 80px;
  }
`;

export const Description = styled.p`
  font-family: "Circular Std";
  font-size: 12px;
  font-weight: light;
  line-height: 16px;
  color: #ffffff;
  padding: 16px 0;

  @media (${(props) => props.theme.media.md}) {
    padding: 24px 0;
    font-size: 16px;
    line-height: 24px;
  }
`;
