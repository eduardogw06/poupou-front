import React from "react";
import {
  Column,
  Description,
  GridContainer,
  Image,
  LineContainer,
  Title,
} from "./SectionGrid.styles";

const SectionGrid = () => {
  return (
    <GridContainer>
      <LineContainer>
        <Column>
          <Title>Lorem Ipsum</Title>
          <Description>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </Description>
        </Column>

        <Image src="/assets/graphic.png" />
      </LineContainer>

      <LineContainer>
        <Column>
          <Title>Lorem Ipsum</Title>
          <Description>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </Description>
        </Column>
        <Image src="/assets/investments.png" />
      </LineContainer>

      <LineContainer>
        <Column>
          <Title>Lorem Ipsum</Title>
          <Description>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </Description>
        </Column>
        <Image src="/assets/targets.png" />
      </LineContainer>
    </GridContainer>
  );
};

export default SectionGrid;
