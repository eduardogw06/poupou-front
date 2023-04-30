import styled from "styled-components";

const Container = styled.div`
    margin-top: ${props => props.theme.sizes.medium3};
    width: calc(100vw - 284px);
`;

const Progress = styled.div`
    background-color: #EAEBF1;
    height: 60px;
    width: calc(100vw - 284px);
    border-radius: 10px;
`;

const CompletedStatus = styled.div<{ percent: number }>`
    display: flex;
    height: 100%;
    width: ${(props: any): string => `${props.percent}%`};
    background-color: ${(props: any): string => props.theme.colors.quaternary};
    border-radius: ${(props: any): string => props.percent < 100 ? '10px 0px 0px 10px' : '10px'};
`;

const TargetAmount = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    font-family: 'Circular Bold';
    font-style: normal;
    font-weight: 700;
    font-size: ${props => props.theme.sizes.medium2};
    line-height: ${props => props.theme.sizes.medium2};
    color: ${(props: any): string => props.theme.colors.text};

`;

const CurrentPercentage = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;

    font-family: 'Circular Bold';
    font-style: normal;
    font-weight: 700;
    font-size: ${props => props.theme.sizes.medium2};
    line-height: ${props => props.theme.sizes.medium2};
    color: ${(props: any): string => props.theme.colors.text};
`;

const CurrentAmount = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 10px;
    font-family: 'Circular Bold';
    font-style: normal;
    font-weight: 700;
    font-size: ${props => props.theme.sizes.medium2};
    line-height: ${props => props.theme.sizes.medium2};
    color: ${(props: any): string => props.theme.colors.text};

`;

export {
    Container,
    Progress,
    CompletedStatus,
    TargetAmount,
    CurrentAmount,
    CurrentPercentage
}