import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";
import { IGetMenus } from "../../../types/IGetMenus";
import { getFontAwesomeIcon } from "../../../utils/getFontAwesomeIcon";
import { isMobile } from "../../../utils/isMobile";
import {
  Container,
  IconContainer,
  MenuItem,
  MenuItemName,
} from "./Sidebar.styles";

const Sidebar = (): JSX.Element => {
  const [menus, setMenus] = useState<IGetMenus[] | null>(null);

  useEffect((): void => {
    const getMenus = async (): Promise<void> => {
      const session = await getSession();
      setMenus(session?.menu);
    };

    getMenus();
  }, []);

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
                    icon={getFontAwesomeIcon(menu.icon)}
                    size={isMobile ? "1x" : "1x"}
                    color={menuIcon}
                  />
                </IconContainer>

                <MenuItemName>{menu.name}</MenuItemName>

                <FontAwesomeIcon
                  icon={getFontAwesomeIcon("chevron-right")}
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
