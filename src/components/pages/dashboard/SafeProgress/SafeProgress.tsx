import Link from "next/link";
import ProgressBar from "../../../common/ProgressBar/ProgressBar";
import { Container, SeeMore } from "./SafeProgress.styles";

interface SafeProgressProps {
  target: string;
}

const SafeProgress = ({ target }: SafeProgressProps): JSX.Element => {
  return (
    <Container>
      <ProgressBar
        currentAmount={2500}
        targetAmount={5000}
        percent={20}
      ></ProgressBar>
      <Link href={`/meus-objetivos/${target}`}>
        <SeeMore>Ver detalhes</SeeMore>
      </Link>
    </Container>
  );
};

export default SafeProgress;
