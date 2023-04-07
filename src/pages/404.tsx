import {
  Container,
  Description,
  Title,
} from "../components/pages/page-404/Page404.styles";

const Page404 = (): JSX.Element => {
  return (
    <Container>
      <Title>Página não encontrada</Title>
      <Description>
        A página que você está procurando não foi encontrada.
      </Description>
    </Container>
  );
};

export default Page404;
