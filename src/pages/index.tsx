import React from "react";

import SectionHeader from "../components/pages/home/SectionHeader/SectionHeader";
import SectionBrand from "../components/pages/home/SectionBrand/SectionBrand";
import SectionWhyUse from "../components/pages/home/SectionWhyUse/SectionWhyUse";
import SectionGrid from "../components/pages/home/SectionGrid/SectionGrid";
import {
  FirstContainer,
  SecondContainer,
} from "../components/pages/index/index.styles";
import Footer from "../components/common/Footer/Footer";

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

      <Footer />
    </>
  );
};

export default Home;
