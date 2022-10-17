import React from "react";

import SectionHeader from "../components/pages/home/SectionHeader/SectionHeader";
import SectionBrand from "../components/pages/home/SectionBrand/SectionBrand";
import SectionWhyUse from "../components/pages/home/SectionWhyUse/SectionWhyUse";
import SectionGrid from "../components/pages/home/SectionGrid/SectionGrid";
import {
  FirstContainer,
  Footer,
  FooterText,
  SecondContainer,
} from "./index.styles";

const Home = (): JSX.Element => {
  return (
    <>
      <FirstContainer>
        <SectionHeader />
        <SectionBrand />
        <SectionWhyUse />
      </FirstContainer>

      <SecondContainer>
        <SectionGrid />
      </SecondContainer>

      <Footer>
        <FooterText>Desenvolvido por Eduardo Guidio Wolf</FooterText>
      </Footer>
    </>
  );
};

export default Home;
