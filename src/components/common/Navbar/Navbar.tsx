import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Hamburguer from "hamburger-react";
import { SignOutResponse, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";
import Logo from "../Logo/Logo";
import {
  Container,
  DropDown,
  DropDownContent,
  DropDownContentItem,
  MaterialUISwitch,
  ProfilePhoto,
} from "./Navbar.styles";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface NavbarProps {
  menuOpened: boolean;
  setMenuOpened: (boolean) => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
  profilePhoto: string;
}

const Navbar = ({
  menuOpened,
  setMenuOpened,
  toggleTheme,
  isDarkTheme,
  profilePhoto,
}: NavbarProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;
  const [dropdownMenuOpened, setDropdownMenuOpened] = useState<boolean>(false);
  const { menuIcon, menuHamburger } = theme.colors;

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

  return (
    <>
      <Container>
        <Hamburguer
          toggled={menuOpened}
          toggle={setMenuOpened}
          color={menuHamburger}
        />
        <Logo showImage={false} />
        <ProfilePhoto
          onClick={() => setDropdownMenuOpened(!dropdownMenuOpened)}
          ref={wrapperRef}
        >
          <Image
            src={
              profilePhoto
                ? `data:image/png;base64,${profilePhoto}`
                : "/assets/user-profile-default.png"
            }
            width="60"
            height="60"
          />
        </ProfilePhoto>
      </Container>
      {dropdownMenuOpened && (
        <DropDown>
          <DropDownContent ref={wrapperRef}>
            <DropDownContentItem>
              <Link href="/perfil">
                <div>
                  <FontAwesomeIcon
                    icon={"user" as IconProp}
                    size="1x"
                    color={menuIcon}
                  />
                  Perfil
                </div>
              </Link>
            </DropDownContentItem>
            <DropDownContentItem>
              <Link href="/alterar-senha">
                <div>
                  <FontAwesomeIcon
                    icon={"key" as IconProp}
                    size="1x"
                    color={menuIcon}
                  />
                  Alterar Senha
                </div>
              </Link>
            </DropDownContentItem>
            <DropDownContentItem>
              <MaterialUISwitch
                checked={isDarkTheme}
                onChange={toggleTheme}
                sx={{ width: 83, height: 40 }}
              />
              Tema
            </DropDownContentItem>
            <DropDownContentItem
              onClick={(): Promise<undefined | SignOutResponse> =>
                signOut({ callbackUrl: "/login" })
              }
            >
              <div>
                <FontAwesomeIcon
                  icon={"sign-out" as IconProp}
                  size="1x"
                  color={menuIcon}
                />
                Sair
              </div>
            </DropDownContentItem>
          </DropDownContent>
        </DropDown>
      )}
    </>
  );
};

export default Navbar;
