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
  font-family: "Circular Bold";
  font-size: ${props => props.theme.sizes.medium1};
  color: #fa58b6;

  @media (${(props) => props.theme.media.md}) {
    font-size: ${props => props.theme.sizes.medium2};
  }
`;

const Description = styled.p`
  font-family: "Circular Light";
  font-size: ${props => props.theme.sizes.small3};
  line-height: ${props => props.theme.sizes.medium1};
  color: #270082;
  padding: ${props => `${props.theme.sizes.medium1} ${props.theme.sizes.none}`};

  @media (${(props) => props.theme.media.md}) {
    font-size: ${props => props.theme.sizes.medium1};
    padding: ${props => `${props.theme.sizes.medium2} ${props.theme.sizes.none}`};
    line-height: ${props => props.theme.sizes.medium3};
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