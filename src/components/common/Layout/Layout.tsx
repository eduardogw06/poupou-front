import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import usePersistedState from "../../../utils/usePersistedState";

import GlobalStyle from "../../../styles/global";
import dark from "../../../styles/themes/dark";
import light from "../../../styles/themes/light";
import Content from "../Content/Content";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { ContentContainer } from "./Layout.styles";
import { DefaultTheme } from "../../../types/DefaultTheme";
import Footer from "../Footer/Footer";
import Router from "next/router";

interface LayoutProps {
  children: any;
  isAuth: boolean;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", dark);
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  const isLoggedIn = () => {
    const sessionToken = localStorage.getItem("sessionToken");

    if (!sessionToken) {
      Router.push("login");
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navbar
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
          toggleTheme={toggleTheme}
          isDarkTheme={theme.title === "dark"}
        />

        <ContentContainer>
          {menuOpened && <Sidebar />}
          <Content menuOpened={menuOpened} children={children} />
        </ContentContainer>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
