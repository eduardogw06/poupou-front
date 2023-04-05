import { useState } from "react";
import { ThemeProvider } from "styled-components";
import usePersistedState from "../../../utils/usePersistedState";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import GlobalStyle from "../../../styles/global";
import dark from "../../../styles/themes/dark";
import light from "../../../styles/themes/light";
import { DefaultTheme } from "../../../types/DefaultTheme";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { ContentContainer } from "./Layout.styles";

interface LayoutProps {
  children: any;
  isAuth: boolean;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [theme, setTheme] = useState<DefaultTheme>(dark);
  const [menuOpened, setMenuOpened] = useState(false);
  const [mountedComponent, setMountedComponent] = useState(false);

  useEffect(() => {
    const localTheme = JSON.parse(window.localStorage.getItem("theme"));
    localTheme.title === "dark" ? setTheme(localTheme) : setTheme(light);
    setMountedComponent(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
    window.localStorage.setItem(
      "theme",
      JSON.stringify(theme.title === "light" ? dark : light)
    );
  };

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Layout;
