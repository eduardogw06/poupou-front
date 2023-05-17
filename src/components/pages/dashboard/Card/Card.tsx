import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Content,
  DeleteButton,
  Header,
  Icon,
  Title,
} from "./Card.styles";

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
  return (
    <Container color={color}>
      <Header>
        <Title>
          {icon && (
            <Icon>
              <FontAwesomeIcon
                icon={icon as IconProp}
                size="1x"
                color="#FA58B6"
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
