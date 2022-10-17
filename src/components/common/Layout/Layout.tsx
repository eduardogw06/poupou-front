import React from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import usePersistedState from "../../../utils/usePersistedState";

import GlobalStyle from "../../../styles/global";
import light from "../../../styles/themes/light";
import dark from "../../../styles/themes/dark";

const Layout = ({ children }: any): JSX.Element => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", dark);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Layout;
