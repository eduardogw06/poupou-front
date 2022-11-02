import Hamburguer from "hamburger-react";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";
import { Container } from "./Navbar.styles";

interface NavbarProps {
  menuOpened: boolean;
  setMenuOpened: (boolean) => void;
}

const Navbar = ({ menuOpened, setMenuOpened }: NavbarProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;

  const onToggle = (isToggled: boolean): JSX.Element => {
    if (isToggled) {
      return <h1>Alooo</h1>;
    }
    return <h1>Testw</h1>;
  };

  return (
    <>
      <Container>
        <Hamburguer
          toggled={menuOpened}
          toggle={setMenuOpened}
          color={theme.colors.menuHamburger}
        />
      </Container>
    </>
  );
};

export default Navbar;
