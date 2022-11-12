import Router from "next/router";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../../../styles/global";
import dark from "../../../styles/themes/dark";

interface LayoutProps {
  children: any;
  isAuth: boolean;
}

const isLoggedIn = () => {
  const sessionToken = localStorage.getItem("sessionToken");

  if (sessionToken) {
    Router.push("dashboard");
  }
};

const LayoutNoAuth = ({ children }: LayoutProps): JSX.Element => {
  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);

  return (
    <>
      <ThemeProvider theme={dark}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
};

export default LayoutNoAuth;
