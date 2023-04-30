import { IGetTarget } from "../../../../../types/IGetTarget";
import { numberToReal } from "../../../../../utils/numberToReal";
import {
  CompletedStatus,
  Container,
  CurrentPercentage,
  Progress,
  TargetAmount,
} from "./TargetProgressTab.styles";

interface TargetProgressTabProps {
  target: IGetTarget;
}

const TargetProgressTab = ({ target }: TargetProgressTabProps): JSX.Element => {
  return (
    <Container>
      <TargetAmount>
        <div>{numberToReal(Number(target.total_saved))}</div>
        <div>{numberToReal(Number(target.target_amount))}</div>
      </TargetAmount>
      <Progress>
        <CompletedStatus percent={target.target_percent}></CompletedStatus>
      </Progress>
      <CurrentPercentage>{`${target.target_percent}%`}</CurrentPercentage>
    </Container>
  );
};

export default TargetProgressTab;
