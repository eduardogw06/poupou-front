import styled from "styled-components";

const LineContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: stretch;
  justify-content: space-around;

  > * {
    background: #FFFFFF;
  }

  @media (${(props) => props.theme.media.md}) {
    flex-direction: row;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (${(props) => props.theme.media.md}) {
    .line-container:nth-child(odd) {
      flex-direction: row;
    }
    .line-container:nth-child(even) {
      flex-direction: row-reverse;
    }
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    background: #FFFFFF;
  }
`;

const Title = styled.h1`
  font-family: "Circular Std";
  font-size: 16px;
  font-weight: bold;
  color: #fa58b6;

  @media (${(props) => props.theme.media.md}) {
    font-size: 20px;
  }
`;

const Description = styled.p`
  font-family: "Circular Std";
  font-size: 12px;
  font-weight: 300;
  line-height: 16px;
  color: #270082;
  padding: 16px 0;

  @media (${(props) => props.theme.media.md}) {
    font-size: 16px;
    padding: 20px 0;
    line-height: 24px;
  }
`;
const Image = styled.img`
  width: 250px;
  height: 170px;
  @media (${(props) => props.theme.media.md}) {
    width: 450px;
    height: 250px;
  }
`;

export { LineContainer, GridContainer, Column, Title, Description, Image }