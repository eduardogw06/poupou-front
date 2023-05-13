import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";
import { IGetMenus } from "../../../types/IGetMenus";
import { isMobile } from "../../../utils/isMobile";
import {
  Container,
  IconContainer,
  MenuItem,
  MenuItemName,
} from "./Sidebar.styles";

interface SidebarProps {
  menus: IGetMenus[] | null;
}

const Sidebar = ({ menus }: SidebarProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;
  const { menuIcon } = theme.colors;

  return (
    <Container>
      {menus &&
        menus.map(
          (menu: IGetMenus, index: number): JSX.Element => (
            <Link key={index} href={menu.url}>
              <MenuItem>
                <IconContainer>
                  <FontAwesomeIcon
                    icon={menu.icon as IconProp}
                    size={isMobile ? "1x" : "1x"}
                    color={menuIcon}
                  />
                </IconContainer>

                <MenuItemName>{menu.name}</MenuItemName>

                <FontAwesomeIcon
                  icon={"chevron-right"}
                  size={isMobile ? "1x" : "sm"}
                  color={menuIcon}
                />
              </MenuItem>
            </Link>
          )
        )}
    </Container>
  );
};

export default Sidebar;
