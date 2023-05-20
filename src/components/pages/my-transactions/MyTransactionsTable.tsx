import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";
import { useTheme } from "styled-components";
import { deleteTransaction as deleteTransactionService } from "../../../services/deleteTransaction";
import { DefaultTheme } from "../../../types/DefaultTheme";
import { IAlertProps } from "../../../types/IAlertProps";
import { IError } from "../../../types/IError";
import { IGetTransaction } from "../../../types/IGetTransaction";
import { MyTransactions as MyTransactionsData } from "../../../types/IMyTransactions";
import { ModalType } from "../../../types/ModalType";
import { isMobile } from "../../../utils/isMobile";
import { numberToReal } from "../../../utils/numberToReal";
import Button from "../../common/Button/Button";
import Dialog from "../../common/Dialog/Dialog";
import EmptyPageAdvice from "../../common/EmptyPageAdvice/EmptyPageAdvice";
import Feedback from "../../common/Feedback/Feedback";
import {
  StyledTable,
  TableActionIconContainer,
} from "../../common/Table/Table.styles";
import DeleteTransactionModal from "./DeleteTransactionModal/DeleteTransactionModal";
import { StyledTableCell } from "./MyTransactions.styles";

interface MyTransationsTableProps {
  data: MyTransactionsData;
  handleOpenModal: (
    modalType: ModalType,
    transactionData: IGetTransaction
  ) => void;
}

interface IDeleteTransactionPayload {
  transaction_id: string;
}

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Aporte excluído com sucesso!",
};

const defaultError = {
  hasError: false,
  message: "",
};

const MyTransationsTable = ({
  data,
  handleOpenModal,
}: MyTransationsTableProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;
  const mobile = isMobile();
  const { columns, rows } = data;
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [deleteTransactionData, setDeleteTransactionData] =
    useState<IGetTransaction | null>(null);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [error, setError] = useState<IError>(defaultError);

  const deleteTransaction = async ({
    transaction_id,
  }: IDeleteTransactionPayload): Promise<void> => {
    setIsLoading(true);
    setButtonDisabled(true);

    const session = await getSession();
    const response = await deleteTransactionService(
      { transaction_id },
      session?.user.jwt
    );

    if (response && response.success) {
      setFeedbackOpened(true);
    } else {
      setError({
        hasError: true,
        message: response.message,
      });
    }
  };

  const handleFeedbackClose = () => {
    setDeleteModalOpened(false);
    Router.reload();
  };

  const handleDeleteTransactionModalOpen = (data: IGetTransaction): void => {
    setDeleteModalOpened(true);
    setDeleteTransactionData(data);
  };

  const DialogButtons = (
    <>
      <Button
        type="button"
        size={mobile ? "small" : "medium"}
        text="Não"
        outlined
        onClick={(): void => setDeleteModalOpened(false)}
      />
      <Button
        type="submit"
        form="deleteTransactionForm"
        size={mobile ? "small" : "medium"}
        text="Confirmar"
        loading={isLoading}
        disabled={buttonDisabled}
      />
    </>
  );

  return (
    <>
      {Object.keys(rows).length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: theme.colors.secondary,
          }}
        >
          <StyledTable size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {columns.map((column: string): JSX.Element => {
                  return (
                    <StyledTableCell key={column}>{column}</StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.uuid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {numberToReal(Number(row.amount))}
                  </StyledTableCell>
                  <StyledTableCell>{row.target.description}</StyledTableCell>
                  <StyledTableCell>
                    {format(new Date(row.date), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </StyledTableCell>
                  <StyledTableCell>
                    <TableActionIconContainer>
                      <FontAwesomeIcon
                        icon={"gear" as IconProp}
                        size="1x"
                        color={theme.colors.text}
                        onClick={(): void => handleOpenModal("edit", row)}
                        style={{ cursor: "pointer" }}
                      />
                      <FontAwesomeIcon
                        icon={"trash" as IconProp}
                        size="1x"
                        color={theme.colors.text}
                        onClick={(): void =>
                          handleDeleteTransactionModalOpen(row)
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </TableActionIconContainer>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>

          {deleteTransactionData && (
            <>
              <Dialog
                isOpen={deleteModalOpened}
                title="Deseja realmente remover este aporte?"
                handleClose={(): void => setDeleteModalOpened(false)}
                buttons={DialogButtons}
              >
                <DeleteTransactionModal
                  data={deleteTransactionData}
                  onSubmit={deleteTransaction}
                  error={error}
                />
              </Dialog>

              <Feedback
                feedbackOpened={feedbackOpened}
                alertProps={defaultAlert}
                handleClose={handleFeedbackClose}
              />
            </>
          )}
        </TableContainer>
      ) : (
        <EmptyPageAdvice text='Não encontramos nenhum aporte cadastrado. Para cadastrar um objetivo e poder começar a investir no seu sonho clique no botão "Novo aporte"' />
      )}
    </>
  );
};

export default MyTransationsTable;
