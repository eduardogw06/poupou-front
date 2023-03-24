import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";
import { getFontAwesomeIcon } from "../../../utils/getFontAwesomeIcon";
import { isMobile } from "../../../utils/isMobile";
import {
  Container,
  IconContainer,
  MenuItem,
  MenuItemName,
} from "./Sidebar.styles";

const Sidebar = (): JSX.Element => {
  const items = [
    {
      key: 1,
      description: "Meus objetivos",
      url: "/",
      icon: "piggy-bank",
    },
    {
      key: 2,
      description: "Meus aportes",
      url: "/",
      icon: "dollar",
    },
    {
      key: 3,
      description: "Aporte automático",
      url: "/",
      icon: "robot",
    },
    { key: 4, description: "Perfil", url: "/", icon: "user" },
    { key: 5, description: "Alterar senha", url: "/", icon: "key" },
  ];

  const theme = useTheme() as DefaultTheme;
  const { menuIcon } = theme.colors;

  return (
    <Container>
      {items.map((item) => (
        <Link key={item.key} href={item.url}>
          <MenuItem>
            <IconContainer>
              <FontAwesomeIcon
                icon={getFontAwesomeIcon(item.icon)}
                size={isMobile ? "1x" : "1x"}
                color={menuIcon}
              />
            </IconContainer>

            <MenuItemName>{item.description}</MenuItemName>

            <FontAwesomeIcon
              icon={getFontAwesomeIcon("chevron-right")}
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
