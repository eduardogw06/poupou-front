import { faKey, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Hamburguer from "hamburger-react";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";
import {
  Container,
  DropDown,
  DropDownContent,
  DropDownContentItem,
  MaterialUISwitch,
  ProfilePhoto,
} from "./Navbar.styles";

interface NavbarProps {
  menuOpened: boolean;
  setMenuOpened: (boolean) => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const Navbar = ({
  menuOpened,
  setMenuOpened,
  toggleTheme,
  isDarkTheme,
}: NavbarProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;
  const [dropdownMenuOpened, setDropdownMenuOpened] = useState<boolean>(false);
  const { menuIcon } = theme.colors;

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownMenuOpened &&
          ref.current &&
          !ref.current.contains(event.target)
        ) {
          setDropdownMenuOpened(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return (): void => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, dropdownMenuOpened, setDropdownMenuOpened]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const logout = () => {
    localStorage.removeItem("sessionToken");
    Router.push("/login");
  };

  return (
    <>
      <Container>
        <Hamburguer
          toggled={menuOpened}
          toggle={setMenuOpened}
          color={theme.colors.menuHamburger}
        />
        <ProfilePhoto
          onClick={() => setDropdownMenuOpened(!dropdownMenuOpened)}
          ref={wrapperRef}
        >
          <Image
            // src="/assets/du.jpg"
            src="/assets/user-profile-default.png"
            width="60"
            height="60"
          />
        </ProfilePhoto>
      </Container>
      {dropdownMenuOpened && (
        <DropDown>
          <DropDownContent ref={wrapperRef}>
            <DropDownContentItem>
              <FontAwesomeIcon icon={faUser} size="1x" color={menuIcon} />
              Perfil
            </DropDownContentItem>
            <DropDownContentItem>
              <FontAwesomeIcon icon={faKey} size="1x" color={menuIcon} />
              Alterar Senha
            </DropDownContentItem>
            <DropDownContentItem>
              <MaterialUISwitch
                checked={isDarkTheme}
                onChange={toggleTheme}
                sx={{ width: 70, height: 40 }}
              />
              Tema
            </DropDownContentItem>
            <DropDownContentItem onClick={logout}>
              <FontAwesomeIcon icon={faSignOut} size="1x" color={menuIcon} />
              Sair
            </DropDownContentItem>
          </DropDownContent>
        </DropDown>
      )}
    </>
  );
};

export default Navbar;
