import styled from "styled-components";


const DeleteTransactionForm = styled.form``;

const DeleteModalRow = styled.div`
    display: flex;
    flex-direction: row;
    
    &:first-child {
        padding-top: ${props => props.theme.sizes.none};
    }
`;

const DeleteModalLabel = styled.label`
  font-family: "WorkSans Medium";
  font-size: ${(props: any): string => props.theme.sizes.small3};
  line-height: 25px;
  color: ${(props) => props.theme.colors.text};
`;

const DeleteModalText = styled.p`
  margin-left: ${props => props.theme.sizes.small2};
  font-family: "WorkSans Regular";
  font-size: ${(props: any): string => props.theme.sizes.small3};
  line-height: 25px;
  color: ${(props) => props.theme.colors.text};
`;

const AlertRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${(props: any): string => props.theme.sizes.medium1};
  
  & > div {
    width: 100%;
  }
`;

export {
  DeleteTransactionForm,
  DeleteModalRow,
  DeleteModalLabel,
  DeleteModalText,
  AlertRow
}