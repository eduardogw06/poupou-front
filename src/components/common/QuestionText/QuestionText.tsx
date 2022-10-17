import Link from "next/link";
import { Container, LinkText, NormalText } from "./QuestionText.styles";

interface QuestionTextProps {
  text: string;
  linkText: string;
  href: string;
}

const QuestionText = ({
  text,
  linkText,
  href,
}: QuestionTextProps): JSX.Element => {
  return (
    <Container>
      <NormalText>{text}</NormalText>
      <Link href={href}>
        <LinkText>{linkText}</LinkText>
      </Link>
    </Container>
  );
};

export default QuestionText;
