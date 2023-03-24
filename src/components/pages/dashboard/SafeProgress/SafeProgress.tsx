import ProgressBar from "../../../common/ProgressBar/ProgressBar";
import { Container } from "./SafeProgress.styles";

const SafeProgress = () => {
  return (
    <Container>
      <ProgressBar
        currentAmount={2500}
        targetAmount={5000}
        percent={20}
      ></ProgressBar>
    </Container>
  );
};

export default SafeProgress;
