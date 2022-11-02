import Hamburguer from "hamburger-react";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";
import { Container } from "./Navbar.styles";

interface NavbarProps {
  menuOpened: boolean;
  setMenuOpened: (boolean) => void;
  toggleTheme: () => void;
}

const Navbar = ({
  menuOpened,
  setMenuOpened,
  toggleTheme,
}: NavbarProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;

  return (
    <>
      <Container>
        <Hamburguer
          toggled={menuOpened}
          toggle={setMenuOpened}
          color={theme.colors.menuHamburger}
        />
        <button onClick={toggleTheme}>Alterar tema</button>
      </Container>
    </>
  );
};

export default Navbar;
