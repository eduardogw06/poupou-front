import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    @media (${(props: any): string => props.theme.media.md}) {
      flex-direction: row;
    }
`;

const FirstColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const BrandText = styled.h1`
    font-family: "Circular Medium";
    color: ${props => props.theme.colors.tertiary};
    font-size: ${props => props.theme.sizes.medium2};
    line-height: ${props => props.theme.sizes.medium3};
    margin: ${props => `${props.theme.sizes.none} ${props.theme.sizes.small3} ${props.theme.sizes.small3} ${props.theme.sizes.none}`};   
    background: #1A1A40;
    

    @media (${(props) => props.theme.media.md}) {
      font-size: ${props => props.theme.sizes.large2};
      line-height: ${props => props.theme.sizes.large4};
      margin: ${props => `${props.theme.sizes.none} ${props.theme.sizes.medium2} ${props.theme.sizes.medium2} ${props.theme.sizes.none}`}; 
    }
`;

const BeginNowButton = styled.div`
    background: ${props => props.theme.colors.quaternary};
    border-radius: ${props => props.theme.sizes.small3};
    height: ${props => props.theme.sizes.medium3};
    width: 100px;
    border: 0;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-family: "WorkSans Bold";
    font-size: ${props => props.theme.sizes.small3};
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;

    &:hover {
      background: ${props => props.theme.colors.tertiary};
    }

    @media (${(props: any): string => props.theme.media.md}) {
      height: ${props => props.theme.sizes.large4};
      width: 160px;
      font-size: ${props => props.theme.sizes.medium1};
    }
`;

const CoinOnPigSafeImage = styled.img`
    border-radius: 200px;
    width: 250px;
    height: 200px;
    display: flex;
    align-items: center;
    margin-top: ${props => props.theme.sizes.medium2};

    @media (${(props) => props.theme.media.md}) {
      border-radius: 300px;
      width: 450px;
      height: 300px;
      margin-top: ${props => props.theme.sizes.none};
    }
`;

export { Container, FirstColumn, BrandText, BeginNowButton, CoinOnPigSafeImage }