import { numberToReal } from "../../../../utils/numberToReal";
import { Container, ContentText } from "./TotalSaved.styles";

interface TotalSavedProps {
  totalSaved: number;
}

const TotalSaved = ({ totalSaved }: TotalSavedProps): JSX.Element => {
  return (
    <Container>
      <ContentText>{numberToReal(totalSaved)}</ContentText>
    </Container>
  );
};

export default TotalSaved;
