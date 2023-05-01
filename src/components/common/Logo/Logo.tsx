import { useSession } from "next-auth/react";
import Link from "next/link";
import { LogoContainer, LogoIcon, LogoName } from "./Logo.styles";

interface LogoProps {
  showImage: boolean;
  imageSide?: "right" | "bottom";
}

const Logo = ({ showImage, imageSide }: LogoProps): JSX.Element => {
  const { data: session } = useSession();

  return (
    <Link href={session ? "/dashboard" : "/"}>
      <LogoContainer imageSide={imageSide ?? "right"}>
        <LogoIcon src="/assets/logo.png" showImage={showImage} />
        <LogoName>POUPOU</LogoName>
      </LogoContainer>
    </Link>
  );
};

export default Logo;
