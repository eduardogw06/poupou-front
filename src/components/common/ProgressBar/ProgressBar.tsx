import {
  CompletedStatus,
  Container,
  ProgressBarContainer,
  ProgressPercent,
  ValuesContainer,
} from "./ProgressBar.styles";

interface ProgressBarProps {
  currentAmount: number;
  targetAmount: number;
  percent: number;
}

const ProgressBar = ({
  currentAmount,
  targetAmount,
  percent,
}: ProgressBarProps): JSX.Element => {
  return (
    <Container>
      <ValuesContainer>
        <span>{`R$ ${currentAmount}`}</span>
        <span>{`R$ ${targetAmount}`}</span>
      </ValuesContainer>

      <ProgressBarContainer>
        <CompletedStatus
          currentAmount={currentAmount}
          targetAmount={targetAmount}
          percent={percent}
        ></CompletedStatus>
        <ProgressPercent>
          <span>{`${percent}%`}</span>
        </ProgressPercent>
      </ProgressBarContainer>
    </Container>
  );
};

export default ProgressBar;
