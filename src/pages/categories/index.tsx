import { GetServerSideProps, GetServerSidePropsContext } from "next";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import { Container } from "../../components/pages/categories/Categories.styles";
import { isValidToken } from "../../utils/isValidToken";
import { getSession } from "next-auth/react";
import CategoriesTable from "../../components/pages/categories/CategoriesTable";
import { ICategories } from "../../types/ICategories";
import { useEffect, useState } from "react";
import { IGetCategory } from "../../types/IGetCategory";
import { getCategories as getCategoriesService } from "../../services/getCategories";
import Button from "../../components/common/Button/Button";
import CategoryModal from "../../components/pages/categories/CategoryModal";
import { ModalType } from "../../types/ModalType";
import { IAlertProps } from "../../types/IAlertProps";
import Dialog from "../../components/common/Dialog/Dialog";
import { isMobile } from "../../utils/isMobile";
import Router from "next/router";
import Feedback from "../../components/common/Feedback/Feedback";

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Aporte atualizado com sucesso!",
};

const Categories = (): JSX.Element => {
  const [categories, setCategories] = useState<IGetCategory[] | []>([]);
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [currentModalType, setCurrentModalType] = useState<ModalType>("create");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [alertProps, setAlertProps] = useState<IAlertProps>(defaultAlert);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IGetCategory | null>(null);
  const mobile = isMobile();

  useEffect((): void => {
    const getCategories = async (): Promise<void> => {
      const session = await getSession();
      const response = await getCategoriesService(false, session?.user.jwt);

      if (response && response.success) {
        setCategories(response.data);
      }
    };

    getCategories();
  }, []);

  const DialogButtons = (
    <Button
      type="submit"
      form={
        currentModalType === "create" ? "newCategoryForm" : "editCategoryForm"
      }
      size={mobile ? "medium" : "small"}
      text={currentModalType === "create" ? "Cadastrar" : "Alterar"}
      loading={isLoading}
      disabled={buttonDisabled}
    />
  );

  const handleClose = (): void => {
    setModalOpened(false);
    Router.reload();
  };

  const handleOpenModal = (
    modalType: ModalType,
    categoryData: IGetCategory
  ): void => {
    setModalOpened(true);
    setCurrentModalType(modalType);
    setModalData(categoryData);
  };

  const columns = ["Categoria", "Ícone", "Ativo", "Ações"];

  let data: ICategories = {
    columns,
    rows: [],
  };

  if (categories) {
    data = {
      ...data,
      rows: categories,
    };
  }
  return (
    <Container>
      <PageTitle>
        Categorias
        <Button
          text="Novo categoria"
          size="small"
          onClick={(): void => handleOpenModal("create", undefined)}
        ></Button>
      </PageTitle>

      <CategoriesTable data={data} handleOpenModal={handleOpenModal} />

      <Feedback
        feedbackOpened={feedbackOpened}
        alertProps={alertProps}
        handleClose={handleClose}
      />

      {modalOpened && (
        <Dialog
          isOpen={modalOpened}
          title={
            currentModalType === "create"
              ? "Nova categoria"
              : "Alterar categoria"
          }
          handleClose={handleClose}
          buttons={DialogButtons}
        >
          <CategoryModal
            type={currentModalType}
            modalData={modalData}
            setAlertProps={setAlertProps}
            setButtonDisabled={setButtonDisabled}
            setIsLoading={setIsLoading}
            setFeedbackOpened={setFeedbackOpened}
            setModalOpened={setModalOpened}
          />
        </Dialog>
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session || !isValidToken(session?.user.jwt)) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (!session.user.is_admin) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Categories;
