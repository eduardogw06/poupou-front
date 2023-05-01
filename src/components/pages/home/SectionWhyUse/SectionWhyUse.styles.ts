import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: ${props => props.theme.sizes.medium3};

  @media (${(props: any): string => props.theme.media.sm}) {
    padding-bottom: ${props => props.theme.sizes.medium2};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;    

`;

const Title = styled.h1`
  font-family: "Circular Medium";
  font-size: ${props => props.theme.sizes.medium1};
  line-height: ${props => props.theme.sizes.medium3};
  color: #fa58b6;

  @media (${(props) => props.theme.media.md}) {
    font-size: ${props => props.theme.sizes.large1};
    line-height: ${props => props.theme.sizes.xlarge3};
  }
`;

const Description = styled.p`
  font-family: "Circular Light";
  font-size: ${props => props.theme.sizes.small3};
  line-height: ${props => props.theme.sizes.medium1};
  color: #ffffff;
  padding: ${props => `${props.theme.sizes.medium1} ${props.theme.sizes.none}`};

  @media (${(props) => props.theme.media.md}) {
    padding: ${props => `${props.theme.sizes.medium3} ${props.theme.sizes.none}`};
    font-size: ${props => props.theme.sizes.medium1};
    line-height: ${props => props.theme.sizes.medium3};
  }
`;

export {
  Description,
  Title,
  ContentWrapper,
  Container
}
