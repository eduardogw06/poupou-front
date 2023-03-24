import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../../types/DefaultTheme";
import { getFontAwesomeIcon } from "../../../../utils/getFontAwesomeIcon";
import { Container, Content, Icon, Title } from "./Card.styles";

interface CardProps {
  title: string;
  children: any;
  icon?: string;
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

const Card = ({
  title,
  children,
  icon,
  justifyContent = "center",
}: CardProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;
  const { menuIcon } = theme.colors;

  return (
    <Container>
      <Title>
        {icon && (
          <Icon>
            <FontAwesomeIcon
              icon={getFontAwesomeIcon(icon)}
              size="1x"
              color={menuIcon}
            />
          </Icon>
        )}
        {title}
      </Title>
      <Content justifyContent={justifyContent}>{children}</Content>
    </Container>
  );
};

export default Card;
