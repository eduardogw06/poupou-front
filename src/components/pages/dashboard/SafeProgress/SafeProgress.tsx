import Link from "next/link";
import ProgressBar from "../../../common/ProgressBar/ProgressBar";
import { Container, SeeMore } from "./SafeProgress.styles";
import { IGetTarget } from "../../../../types/IGetTarget";

interface SafeProgressProps {
  target: IGetTarget;
}

const SafeProgress = ({ target }: SafeProgressProps): JSX.Element => {
  return (
    <Container>
      <ProgressBar
        currentAmount={Number(target.total_saved)}
        targetAmount={Number(target.target_amount)}
        percent={Number(target.target_percent)}
      ></ProgressBar>
      <Link href={`/meus-objetivos/${target.uuid}`}>
        <SeeMore>Ver detalhes</SeeMore>
      </Link>
    </Container>
  );
};

export default SafeProgress;
