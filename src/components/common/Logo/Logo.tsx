import Link from "next/link";
import { useEffect } from "react";
import { LogoContainer, LogoIcon, LogoName } from "./Logo.styles";

interface LogoProps {
  showImage: boolean;
  imageSide?: "right" | "bottom";
}

const isLoggedIn = (): string => {
  return typeof window !== "undefined"
    ? localStorage.getItem("sessionToken")
    : null;
};

const Logo = ({ showImage, imageSide }: LogoProps): JSX.Element => {
  return (
    <Link href={isLoggedIn() != null ? "/dashboard" : "/"}>
      <LogoContainer imageSide={imageSide ?? "right"}>
        <LogoIcon src="/assets/logo.png" showImage={showImage} />
        <LogoName>POUPOU</LogoName>
      </LogoContainer>
    </Link>
  );
};

export default Logo;
