import Link from "next/link";
import { LogoContainer, LogoIcon, LogoName } from "./Logo.styles";

interface LogoProps {
  showImage: boolean;
  imageSide?: "right" | "bottom";
}

const Logo = ({ showImage, imageSide }: LogoProps): JSX.Element => {
  const isLoggedIn = () => {
    return localStorage.getItem("sessionToken");
  };

  return (
    <Link href={isLoggedIn ? "/dashboard" : "/"}>
      <LogoContainer imageSide={imageSide ?? "right"}>
        <LogoIcon src="/assets/logo.png" showImage={showImage} />
        <LogoName>POUPOU</LogoName>
      </LogoContainer>
    </Link>
  );
};

export default Logo;
