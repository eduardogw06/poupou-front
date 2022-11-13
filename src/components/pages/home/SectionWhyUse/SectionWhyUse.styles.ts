import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 24px;

  @media (${(props: any): string => props.theme.media.sm}) {
    padding-bottom: 20px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;    

`;

const Title = styled.h1`
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

const Description = styled.p`
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

export {
  Description,
  Title,
  ContentWrapper,
  Container
}
