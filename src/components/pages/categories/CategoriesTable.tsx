import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";
import { ICategories } from "../../../types/ICategories";
import { IGetCategory } from "../../../types/IGetCategory";
import { ModalType } from "../../../types/ModalType";
import { IconContainer, StyledTableCell } from "./Categories.styles";
import { useState } from "react";
import Dialog from "../../common/Dialog/Dialog";
import Button from "../../common/Button/Button";
import { isMobile } from "../../../utils/isMobile";
import { getSession } from "next-auth/react";
import { deleteCategory as deleteCategoryService } from "../../../services/deleteCategory";
import { IError } from "../../../types/IError";
import { IAlertProps } from "../../../types/IAlertProps";
import Feedback from "../../common/Feedback/Feedback";
import Router from "next/router";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { IDeleteCategoryPayload } from "../../../types/IDeleteCategoryPayload";

interface CategoriesTableProps {
  data: ICategories;
  handleOpenModal: (modalType: ModalType, cateogyData: IGetCategory) => void;
}

const defaultError = {
  hasError: false,
  message: "",
};

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Categoria excluída com sucesso!",
};

const CategoriesTable = ({
  data,
  handleOpenModal,
}: CategoriesTableProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;
  const mobile = isMobile();
  const { columns, rows } = data;
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [error, setError] = useState<IError>(defaultError);
  const [deleteCategoryData, setDeleteCategoryData] =
    useState<IGetCategory | null>(null);

  const handleDeleteCategoryModalOpen = (data: IGetCategory): void => {
    setDeleteModalOpened(true);
    setDeleteCategoryData(data);
  };

  const handleFeedbackClose = (): void => {
    setDeleteModalOpened(false);
    Router.reload();
  };

  const handleGiveUpButton = (): void => {
    setDeleteModalOpened(false);
    setIsLoading(false);
    setButtonDisabled(false);
    setError(defaultError);
  };

  const deleteCategory = async ({
    category_id,
  }: IDeleteCategoryPayload): Promise<void> => {
    setIsLoading(true);
    setButtonDisabled(true);

    const session = await getSession();
    const response = await deleteCategoryService(
      { category_id },
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

  const DialogButtons = (
    <>
      <Button
        type="button"
        size={mobile ? "medium" : "small"}
        text="Não"
        outlined
        onClick={handleGiveUpButton}
      />
      <Button
        type="submit"
        form="deleteCategoryForm"
        size={mobile ? "medium" : "small"}
        text="Confirmar"
        loading={isLoading}
        disabled={buttonDisabled}
      />
    </>
  );

  return (
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
              return <StyledTableCell key={column}>{column}</StyledTableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(
            (row: IGetCategory): JSX.Element => (
              <TableRow
                key={row.uuid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell>{row.icon}</StyledTableCell>
                <StyledTableCell>{row.active ? "Sim" : "Não"}</StyledTableCell>
                <StyledTableCell>
                  <IconContainer>
                    <FontAwesomeIcon
                      icon={"gear"}
                      size="1x"
                      color={theme.colors.text}
                      onClick={(): void => handleOpenModal("edit", row)}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={"trash"}
                      size="1x"
                      color={theme.colors.text}
                      onClick={(): void => handleDeleteCategoryModalOpen(row)}
                      style={{ cursor: "pointer" }}
                    />
                  </IconContainer>
                </StyledTableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      {deleteCategoryData && (
        <>
          <Dialog
            isOpen={deleteModalOpened}
            title="Deseja realmente remover este aporte?"
            handleClose={(): void => setDeleteModalOpened(false)}
            buttons={DialogButtons}
          >
            <DeleteCategoryModal
              data={deleteCategoryData}
              onSubmit={deleteCategory}
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
  );
};

export default CategoriesTable;
