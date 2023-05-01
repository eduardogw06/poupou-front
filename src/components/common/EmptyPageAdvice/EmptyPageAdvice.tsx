import Link from "next/link";
import {
  EmptyPageContainer,
  EmptyPageText,
  EmptyPageTextLink,
} from "./EmptyPageAdvice.styles";

interface EmptyPageAdviceProps {
  text: string;
  href?: string;
  hrefText?: string;
}

const EmptyPageAdvice = ({
  text,
  href,
  hrefText,
}: EmptyPageAdviceProps): JSX.Element => {
  return (
    <EmptyPageContainer>
      <EmptyPageText>
        {text}
        {href && hrefText && (
          <Link href={href}>
            <EmptyPageTextLink>{hrefText}</EmptyPageTextLink>
          </Link>
        )}
      </EmptyPageText>
    </EmptyPageContainer>
  );
};

export default EmptyPageAdvice;
