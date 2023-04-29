import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";
import { MyTransactions as MyTransactionsData } from "../../../types/IMyTransactions";
import { ModalType } from "../../../types/ModalType";
import { getFontAwesomeIcon } from "../../../utils/getFontAwesomeIcon";
import { isMobile } from "../../../utils/isMobile";
import Button from "../../common/Button/Button";
import Dialog from "../../common/Dialog/Dialog";
import DeleteTransactionModal from "./DeleteTransactionModal/DeleteTransactionModal";
import { IconContainer, StyledTableCell } from "./MyTransactions.styles";
import { getSession } from "next-auth/react";
import { deleteTransaction as deleteTransactionService } from "../../../services/deleteTransaction";
import Router from "next/router";
import Feedback from "../../common/Feedback/Feedback";
import { IAlertProps } from "../../../types/IAlertProps";
import { IError } from "../../../types/IError";
import EmptyPageAdvice from "../../common/EmptyPageAdvice/EmptyPageAdvice";
import { numberToReal } from "../../../utils/numberToReal";

interface MyTransationsTableProps {
  data: MyTransactionsData;
  handleOpenModal: (
    isOpen: boolean,
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
    console.log(data);
    setDeleteModalOpened(true);
    setDeleteTransactionData(data);
  };

  const DialogButtons = (
    <>
      <Button
        type="button"
        size={mobile ? "medium" : "small"}
        text="Não"
        outlined
        onClick={(): void => setDeleteModalOpened(false)}
      />
      <Button
        type="submit"
        form="deleteTransactionForm"
        size={mobile ? "medium" : "small"}
        text="Confirmar"
        loading={isLoading}
        disabled={buttonDisabled}
      />
    </>
  );

  return (
    <>
      {Object.keys(rows).length ? (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: theme.colors.secondary,
          }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                    <IconContainer>
                      <FontAwesomeIcon
                        icon={getFontAwesomeIcon("gear")}
                        size="1x"
                        color={theme.colors.text}
                        onClick={(): void => handleOpenModal(true, "edit", row)}
                        style={{ cursor: "pointer" }}
                      />
                      <FontAwesomeIcon
                        icon={getFontAwesomeIcon("trash")}
                        size="1x"
                        color={theme.colors.text}
                        onClick={(): void =>
                          handleDeleteTransactionModalOpen(row)
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </IconContainer>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

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
        <EmptyPageAdvice
          text="Não encontramos nenhum aporte cadastrado. Para cadastrar um aporte e poder começar a investir no seu sonho clique "
          href="/meus-aportes"
          hrefText="AQUI."
        />
      )}
    </>
  );
};

export default MyTransationsTable;
