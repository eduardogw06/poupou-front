import { getSession } from "next-auth/react";
import Link from "next/link";
import { LogoContainer, LogoIcon, LogoName } from "./Logo.styles";

interface LogoProps {
  showImage: boolean;
  imageSide?: "right" | "bottom";
}

const isLoggedIn = async (): Promise<boolean> => {
  const session = await getSession();

  return session ? true : null;
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
