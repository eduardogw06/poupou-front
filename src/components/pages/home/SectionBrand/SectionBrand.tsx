import React from "react";
import {
  BeginNowButton,
  BrandText,
  CoinOnPigSafeImage,
  Container,
  FirstColumn,
} from "./SectionBrand.styles";
import Link from "next/link";

const SectionBrand = (): JSX.Element => {
  return (
    <Container>
      <FirstColumn>
        <BrandText>Organize suas finanças e realize seus sonhos</BrandText>
        <Link href="/login">
          <BeginNowButton>Comece já</BeginNowButton>
        </Link>
      </FirstColumn>

      <CoinOnPigSafeImage src="/assets/coin-on-pig-safe.png" />
    </Container>
  );
};

export default SectionBrand;
