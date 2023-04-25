import { useEffect, useState } from "react";
import { ModalType } from "../../../../../types/ModalType";
import MyTransationsTable from "../../../my-transactions/MyTransactionsTable";
import { Container } from "./TargetTransactionsTab.styles";
import { getSession } from "next-auth/react";
import { getTransactions as getTransactionsService } from "../../../../../services/getTransactions";
import { MyTransactionsData } from "../../../../../types/IMyTransactions";
import { useRouter } from "next/router";
import EmptyPageAdvice from "../../../../common/EmptyPageAdvice/EmptyPageAdvice";

interface TargetTransactionsTabProps {
  handleOpenModal: (
    isOpen: boolean,
    modalType: ModalType,
    transactionData: IGetTransaction
  ) => void;
}

const TargetTransactionsTab = ({
  handleOpenModal,
}: TargetTransactionsTabProps): JSX.Element => {
  const [transactions, setTransactions] = useState<IGetTransaction[] | null>(
    null
  );

  const router = useRouter();
  const targetId = router.query.uuid as string;

  useEffect((): void => {
    const getTransactions = async (): Promise<void> => {
      const session = await getSession();
      const response = await getTransactionsService({
        userId: session?.user.id,
        sessionToken: session?.user.jwt,
        targetId: targetId,
      });

      if (response && response.success) {
        setTransactions(response.data);
      }
    };

    getTransactions();
  }, []);

  const columns = ["Valor Aporte", "Objetivo", "Data aporte", "Ações"];

  let data: MyTransactionsData = {
    columns,
    rows: [],
  };

  if (transactions) {
    data = { ...data, rows: transactions };
  }

  return (
    <>
      <Container>
        <MyTransationsTable data={data} handleOpenModal={handleOpenModal} />
      </Container>
    </>
  );
};

export default TargetTransactionsTab;
