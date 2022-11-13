import React from "react";
import {
  Column,
  Description,
  GridContainer,
  Image,
  LineContainer,
  Title,
} from "./SectionGrid.styles";

interface SectionGridContent {
  key: number;
  title: string;
  description: string;
  image: string;
}

const SectionGrid = () => {
  const content: SectionGridContent[] = [
    {
      key: 1,
      title: "Crie objetivos e acompanhe sua evolução",
      description: `Viagens, automóvel novo, presentes, férias e muito mais. Crie seu objetivo e comece a poupar já.`,
      image: "/assets/targets.png",
    },
    {
      key: 2,
      title: "Invista quando e quanto puder",
      description: `A grana encurtou esse mês? Não tem problema! 
        Invista no momento que puder e mantenha o foco no longo prazo. A vida é uma maratona e não uma corrida de 100 metros.`,
      image: "/assets/investments.png",
    },
    {
      key: 3,
      title: "Acesse seus gráficos e gerencie seu objetivo",
      description: `Deixe o Sistema Poupou te livrar das planilhas e da papelada. Tenha acesso a gráficos e tabelas que o ajudam a compreender seu progresso e não deixam a sua peteca cair.`,
      image: "/assets/graphic.png",
    },
  ];

  return (
    <GridContainer>
      {content.map((item: SectionGridContent) => (
        <LineContainer key={item.key} className="line-container">
          <Column>
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
          </Column>

          <Image src={item.image} />
        </LineContainer>
      ))}
    </GridContainer>
  );
};

export default SectionGrid;
