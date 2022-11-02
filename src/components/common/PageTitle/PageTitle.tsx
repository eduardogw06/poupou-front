import { Title } from "./PageTitle.styles";

interface PageTitleProps {
  children: any;
}

const PageTitle = ({ children }: PageTitleProps): JSX.Element => {
  return <Title>{children}</Title>;
};

export default PageTitle;
