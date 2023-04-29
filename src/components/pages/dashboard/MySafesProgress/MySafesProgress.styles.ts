import styled from "styled-components";

const Container = styled.div`
    width: fit-content;
    height: fit-content;
`;

const CustomTooltipContainer = styled.div`
    background-color: white;
    padding: 10px;
    border: 1px solid #ccc;

    & > {
        color: black;
    }
`;

export {
    Container,
    CustomTooltipContainer
};
