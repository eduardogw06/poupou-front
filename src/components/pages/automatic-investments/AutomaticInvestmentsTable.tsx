import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTheme } from "styled-components";
import { isMobile } from "../../../utils/isMobile";
import { DefaultTheme } from "../../../types/DefaultTheme";
import { useState } from "react";
import { ModalType } from "../../../types/ModalType";
import { IAutomaticInvestments } from "../../../types/IAutomaticInvestments";
import { IGetAutomaticInvestments } from "../../../types/IGetAutomaticInvestments";
import {
  StyledTableCell,
  TableActionIconContainer,
} from "../../common/Table/Table.styles";
import { numberToReal } from "../../../utils/numberToReal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Dialog from "../../common/Dialog/Dialog";
import Feedback from "../../common/Feedback/Feedback";
import EmptyPageAdvice from "../../common/EmptyPageAdvice/EmptyPageAdvice";
import { IError } from "../../../types/IError";
import { IAlertProps } from "../../../types/IAlertProps";
import DeleteAutomaticInvestmentModal from "./DeleteAutomaticInvestmentModal/DeleteAutomaticInvestmentModal";
import { deleteAutomaticInvestment as deleteAutomaticInvestmentService } from "../../../services/deleteAutomaticInvestment";
import { getSession } from "next-auth/react";
import Router from "next/router";
import Button from "../../common/Button/Button";

interface AutomaticInvestmentsTableProps {
  data: IAutomaticInvestments;
  handleOpenModal: (
    modalType: ModalType,
    automaticInvestmentData: IGetAutomaticInvestments
  ) => void;
}

interface IDeleteAutomaticInvestmentPayload {
  automatic_investment_id: string;
}

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Aporte automático excluído com sucesso!",
};

const defaultError = {
  hasError: false,
  message: "",
};

const AutomaticInvestmentsTable = ({
  data,
  handleOpenModal,
}: AutomaticInvestmentsTableProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;
  const mobile = isMobile();
  const { columns, rows } = data;
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [deleteAutomaticInvestmentData, setDeleteAutomaticInvestmentData] =
    useState<IGetAutomaticInvestments | null>(null);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [error, setError] = useState<IError>(defaultError);

  const deleteAutomaticInvestment = async ({
    automatic_investment_id,
  }: IDeleteAutomaticInvestmentPayload): Promise<void> => {
    setIsLoading(true);
    setButtonDisabled(true);

    const session = await getSession();
    const response = await deleteAutomaticInvestmentService(
      { automatic_investment_id },
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

  const handleDeleteAutomaticInvestmentModalOpen = (
    data: IGetAutomaticInvestments
  ): void => {
    setDeleteModalOpened(true);
    setDeleteAutomaticInvestmentData(data);
  };

  const handleFeedbackClose = (): void => {
    setDeleteModalOpened(false);
    Router.reload();
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
        form="deleteAutomaticInvestmentForm"
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
                  <StyledTableCell>{row.target.description}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {numberToReal(Number(row.amount))}
                  </StyledTableCell>
                  <StyledTableCell>{row.day}</StyledTableCell>
                  <StyledTableCell>
                    {row.active ? "Sim" : "Não"}
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
                          handleDeleteAutomaticInvestmentModalOpen(row)
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </TableActionIconContainer>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {deleteAutomaticInvestmentData && (
            <>
              <Dialog
                isOpen={deleteModalOpened}
                title="Deseja realmente remover este aporte?"
                handleClose={(): void => setDeleteModalOpened(false)}
                buttons={DialogButtons}
              >
                <DeleteAutomaticInvestmentModal
                  data={deleteAutomaticInvestmentData}
                  onSubmit={deleteAutomaticInvestment}
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
        <EmptyPageAdvice text='Não encontramos nenhum aporte automático cadastrado. Para cadastrar um aporte e poder começar a investir no seu sonho clique no botão "Novo aporte automático"' />
      )}
    </>
  );
};

export { AutomaticInvestmentsTable };
