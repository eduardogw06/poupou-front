import React from "react";
import Logo from "../../../common/Logo";
import { Container, Header } from "./SectionHeader.styles";

const SectionHeader = () => {
  return (
    <Container>
      <Header>
        <Logo showImage={true}></Logo>
      </Header>
    </Container>
  );
};

export default SectionHeader;
