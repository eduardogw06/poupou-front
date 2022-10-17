import Link from "next/link";
import React from "react";
import { LogoContainer, LogoIcon, LogoName } from "./Logo.styles";

interface LogoProps {
  showImage: boolean;
  imageSide?: "right" | "bottom";
}

const Logo = ({ showImage, imageSide }: LogoProps): JSX.Element => {
  return (
    <Link href="/">
      <LogoContainer imageSide={imageSide ?? "right"}>
        <LogoIcon src="/assets/logo.png" showImage={showImage} />
        <LogoName>POUPOU</LogoName>
      </LogoContainer>
    </Link>
  );
};

export default Logo;
