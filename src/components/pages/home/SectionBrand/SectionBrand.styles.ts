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
    font-family: "Circular Std";
    font-weight: bold;
    color: #fa58b6;
    font-size: 20px;
    line-height: 24px;
    margin: 0 12px 12px 0;    
    background: #1A1A40;
    

    @media (${(props) => props.theme.media.md}) {
      font-family: "Circular Std";
      font-size: 36px;
      line-height: 48px;
      margin: 0 20px 20px 0;
    }
`;

const BeginNowButton = styled.div`
    background: #7a0bc0;
    border-radius: 10px;
    height: 25px;
    width: 100px;
    border: 0;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-family: "Work Sans";
    font-weight: 700;
    font-size: 10px;
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;

    &:hover {
      background: #fa58b6;
    }

    @media (${(props: any): string => props.theme.media.md}) {
      height: 50px;
      width: 160px;
      font-size: 16px;
  }
`;

const CoinOnPigSafeImage = styled.img`
    border-radius: 200px;
    width: 250px;
    height: 200px;
    display: flex;
    align-items: center;
    margin-top: 20px;

    @media (${(props) => props.theme.media.md}) {
      border-radius: 300px;
      width: 450px;
      height: 300px;
      margin-top: 0px;
    }
`;

export { Container, FirstColumn, BrandText, BeginNowButton, CoinOnPigSafeImage }