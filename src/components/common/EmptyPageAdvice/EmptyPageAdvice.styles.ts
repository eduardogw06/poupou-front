import styled from "styled-components";

const EmptyPageContainer = styled.div`
  /* display: flex; */
`;

const EmptyPageText = styled.div`
  display: inline;
  font-family: "Circular Regular";
  font-size: ${(props: any): string => props.theme.sizes.medium1};
  line-height: 25px;
  color: ${(props) => props.theme.colors.text};
`;

const EmptyPageTextLink = styled.strong`
  font-family: "Circular Bold";
  font-size: ${(props: any): string => props.theme.sizes.medium1};
  line-height: 25px;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
`;

export {
    EmptyPageContainer,
    EmptyPageText,
    EmptyPageTextLink
}