import { TableCell } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  width: 100%;
  padding-right: 24px;
  padding-left: 24px;
  padding-bottom: 24px;

  @media (${(props: any): string => props.theme.media.md}) {
    padding-right: 48px;
    padding-left: 48px;
    padding-top: 36px;
    padding-bottom: 36px;
  }
`;

const StyledTableCell = styled(TableCell)`
  color: ${(props) => props.theme.colors.text} !important;
`;

const IconContainer = styled.div`
  > * {
    margin-right: 12px;
  }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;

    > div {
        &:first-child div{
            margin-top: ${props => props.theme.sizes.none};
        }
        
        margin-top: ${props => props.theme.sizes.medium3};
    }
`;

const DeleteCategoryForm = styled.form``;

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

const HeaderTitle = styled.div`
    display: flex;
    flex-direction: row;

    font-family: 'Circular Bold';
    font-style: normal;
    font-weight: 700;
    font-size: ${(props: any): string => props.theme.sizes.medium3};
    line-height: ${(props: any): string => props.theme.sizes.large3};
    color: ${(props: any): string => props.theme.colors.text};
    cursor: pointer;

    @media(${(props) => props.theme.media.md}) {
        font-size: ${(props: any): string => props.theme.sizes.large1};
    }
`;

const HeaderButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

     & > :first-child {
        margin-right: 20px;
    }

    @media(${(props) => props.theme.media.md}) {
        width: 50%;
    }
`;

export {
  Container,
  StyledTableCell,
  IconContainer,
  FormContainer,
  DeleteCategoryForm,
  DeleteModalRow,
  DeleteModalLabel,
  DeleteModalText,
  AlertRow,
  HeaderTitle,
  HeaderButtons
}