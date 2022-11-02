import styled from "styled-components";


const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    background-color: ${(props: any) => props.theme.colors.secondary};

    padding: 20px; ;
`;

const Notifications = styled.div`

`



export { Container, Notifications }