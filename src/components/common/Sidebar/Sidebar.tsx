import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  Container,
  IconContainer,
  MenuItem,
  MenuItemName,
} from "./Sidebar.styles";
import {
  faPiggyBank,
  faDollar,
  faRobot,
  faKey,
  faUser,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "../../../utils/isMobile";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";

const Sidebar = (): JSX.Element => {
  const items = [
    { description: "Meus objetivos", url: "/", icon: faPiggyBank },
    { description: "Meus aportes", url: "/", icon: faDollar },
    { description: "Aporte automático", url: "/", icon: faRobot },
    { description: "Perfil", url: "/", icon: faUser },
    { description: "Alterar senha", url: "/", icon: faKey },
  ];

  const theme = useTheme() as DefaultTheme;
  const { menuIcon } = theme.colors;

  return (
    <Container>
      {items.map((item) => (
        <Link href={item.url}>
          <MenuItem>
            <IconContainer>
              <FontAwesomeIcon
                icon={item.icon}
                size={isMobile ? "1x" : "1x"}
                color={menuIcon}
              />
            </IconContainer>

            <MenuItemName>{item.description}</MenuItemName>

            <FontAwesomeIcon
              icon={faChevronRight}
              size={isMobile ? "1x" : "sm"}
              color={menuIcon}
            />
          </MenuItem>
        </Link>
      ))}
    </Container>
  );
};

export default Sidebar;
