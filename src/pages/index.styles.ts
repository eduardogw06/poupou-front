import styled from "styled-components";

const FirstContainer = styled.div`
  height: 100%;
  background: #1a1a40;
  display: flex;
  flex-direction: column;
  align-items: start;

  padding: ${(props: any) => {
    const sizes = props.theme.sizes;

    return `${sizes.medium1} ${sizes.medium4} 0px ${sizes.medium4}`;
  }};

  @media (${(props) => props.theme.media.md}) {
    padding: ${(props: any) => {
    const sizes = props.theme.sizes;

    return `${sizes.medium1} ${sizes.xlarge1} 0px ${sizes.xlarge1}`;
  }};
  }
`;

const SecondContainer = styled.div`
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: ${(props: any) => {
    const sizes = props.theme.sizes;

    return `${sizes.medium1} ${sizes.xlarge1} 0px ${sizes.xlarge1}`;
  }};
`;

export { FirstContainer, SecondContainer }