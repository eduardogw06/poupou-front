import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    
    width: 200px;
    margin: ${props => `${props.theme.sizes.none} ${props.theme.sizes.medium4} ${props.theme.sizes.large2} ${props.theme.sizes.medium4}`};


    @media (${(props: any): string => props.theme.media.md}) {
        width: 300px;
    }
`;

const ProgressBarContainer = styled.div`
    height: ${(props: any): string => props.theme.sizes.small3};
    width: 200px;
    background-color: #FFFFFF;
    margin-top: ${props => props.theme.sizes.small2};


    @media (${(props: any): string => props.theme.media.md}) {
        width: 300px;
    }
`;

const ValuesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > span {
        font-family: 'Circular Bold';
        font-style: normal;
        font-weight: 700;
        font-size: ${props => props.theme.sizes.small3};
        line-height: ${props => props.theme.sizes.small3};
        color: ${(props: any): string => props.theme.colors.text};
    }
`;

const CompletedStatus = styled.div<{ currentAmount: number, targetAmount: number, percent: number }>`
    display: flex;
    height: 100%;
    width: ${(props: any): string => `${props.percent}%`};
    background-color: ${(props: any): string => props.theme.colors.tertiary};
    border-radius: inherit;
    text-align: right;
`;

const ProgressPercent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: ${props => props.theme.sizes.small2};

    & > span {
        font-family: 'Circular Bold';
        font-style: normal;
        font-weight: 700;
        font-size: ${props => props.theme.sizes.small3};
        line-height: ${props => props.theme.sizes.small3};
        color: ${(props: any): string => props.theme.colors.text};
    }
`;

export {
    Container,
    CompletedStatus,
    ProgressPercent,
    ValuesContainer,
    ProgressBarContainer
};