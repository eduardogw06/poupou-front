import { Container } from "./Content.styles";

interface ContentProps {
  children: any;
  menuOpened;
}

const Content = ({ children, menuOpened }: ContentProps): JSX.Element => {
  return <Container menuOpened={false}>{children}</Container>;
};

export default Content;
