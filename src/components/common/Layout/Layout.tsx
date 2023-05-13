import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../../../styles/global";
import dark from "../../../styles/themes/dark";
import light from "../../../styles/themes/light";
import { DefaultTheme } from "../../../types/DefaultTheme";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { ContentContainer } from "./Layout.styles";
import { IGetMenus } from "../../../types/IGetMenus";
import { getSession } from "next-auth/react";

interface LayoutProps {
  children: any;
  session: any;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [theme, setTheme] = useState<DefaultTheme>(dark);
  const [menuOpened, setMenuOpened] = useState(false);
  const [mountedComponent, setMountedComponent] = useState(false);
  const [menus, setMenus] = useState<IGetMenus[] | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    const getMenus = async (): Promise<void> => {
      const session = await getSession();
      setMenus(session?.menu);
      setProfilePhoto(session?.user?.photo);
    };

    getMenus();

    const localTheme = JSON.parse(window.localStorage.getItem("theme"));
    localTheme?.title === "light" ? setTheme(localTheme) : setTheme(dark);
    setMountedComponent(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
    window.localStorage.setItem(
      "theme",
      JSON.stringify(theme.title === "light" ? dark : light)
    );
  };

  if (!mountedComponent) return <div />;

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navbar
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
          toggleTheme={toggleTheme}
          isDarkTheme={theme.title === "dark"}
          profilePhoto={profilePhoto}
        />

        <ContentContainer>
          {menuOpened && <Sidebar menus={menus} />}
          <Content menuOpened={menuOpened} children={children} />
        </ContentContainer>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
