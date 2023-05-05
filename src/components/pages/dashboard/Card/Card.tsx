import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../../types/DefaultTheme";
import {
  Container,
  Content,
  Header,
  Icon,
  DeleteButton,
  Title,
} from "./Card.styles";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface CardProps {
  title?: string;
  children: any;
  icon?: string;
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  color?: string;
  deleteCardButton?: boolean;
  handleDeleteCard?: () => void;
}

const Card = ({
  title,
  children,
  icon,
  justifyContent = "center",
  color,
  deleteCardButton = false,
  handleDeleteCard,
}: CardProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;
  const { menuIcon } = theme.colors;

  return (
    <Container color={color}>
      <Header>
        <Title>
          {icon && (
            <Icon>
              <FontAwesomeIcon
                icon={icon as IconProp}
                size="1x"
                color={menuIcon}
              />
            </Icon>
          )}
          {title}
        </Title>

        {deleteCardButton && (
          <DeleteButton onClick={handleDeleteCard}>X</DeleteButton>
        )}
      </Header>
      <Content justifyContent={justifyContent}>{children}</Content>
    </Container>
  );
};

export default Card;
