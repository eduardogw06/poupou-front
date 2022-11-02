import { ThemeProvider } from "styled-components";

import GlobalStyle from "../../../styles/global";
import dark from "../../../styles/themes/dark";

interface LayoutProps {
  children: any;
  isAuth: boolean;
}

const LayoutNoAuth = ({ children }: LayoutProps): JSX.Element => {
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
