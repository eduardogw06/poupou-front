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
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { getMenus as getMenusService } from "../../../services/getMenus";
import { IGetMenus } from "../../../types/IGetMenus";

const Sidebar = (): JSX.Element => {
  const [menus, setMenus] = useState<IGetMenus[] | null>(null);

  useEffect((): void => {
    const getMenus = async (): Promise<void> => {
      const session = await getSession();
      const response = await getMenusService(session?.user.jwt);

      if (response && response.success) {
        setMenus(response.data);
      }
    };

    getMenus();
  }, []);

  console.log(menus);

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
