import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTransactions as getTransactionsService } from "../../../../../services/getTransactions";
import { MyTransactions } from "../../../../../types/IMyTransactions";
import { ModalType } from "../../../../../types/ModalType";
import MyTransationsTable from "../../../my-transactions/MyTransactionsTable";
import { Container } from "./TargetTransactionsTab.styles";
import { IGetTransaction } from "../../../../../types/IGetTransaction";

interface TargetTransactionsTabProps {
  handleOpenModal: (
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

  let data: MyTransactions = {
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
