import {
  CompletedStatus,
  Container,
  Progress,
  TargetAmount,
} from "./TargetProgressTab.styles";

const TargetProgressTab = (): JSX.Element => {
  return (
    <Container>
      {/* <CurrentAmount>R$ 2.500,00</CurrentAmount> */}
      <Progress>
        <CompletedStatus percent={50}></CompletedStatus>
        {/* <CurrentPercentage>20</CurrentPercentage> */}
        <TargetAmount>R$ 5.000,00</TargetAmount>
      </Progress>
    </Container>
  );
};

export default TargetProgressTab;
