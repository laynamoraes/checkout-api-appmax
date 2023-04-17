import React from "react"
import { GlobalStyle } from "../../styles/global"
import { Logo } from "../../components/Logo"
import ArrowDownImg from "../../assets/arrow-down-icon.svg"
import { CarrosselSecundary } from "../../components/CarrosselSecundary"
import { FrameDefault } from "./Db"

import {
  ArrowCnt,
  ArrowDown,
  ButtonCnt,
  ButtonOne,
  Container,
  Header,
  ImageBackground,
  Section,
  SubtitlePresentation,
  TitlePresentation,
} from "./styles"
import { Footer } from "../../components/Footer"


const Home = ({
  linkLogo = "https://cdn.shopify.com/s/files/1/0709/8803/8436/files/Loga_Adquira.png?v=1680385079",
  imageBackground = "https://cdn.shopify.com/s/files/1/0709/8803/8436/files/Design_sem_nome_1_1600x1600_crop_center.png?v=1677624546",
  titlePresentation = "OS NOSSOS PRODUTOS SÃO FEITOS PENSANDO NO EXTREMO CONFORTO  E GANHAM VIDA COM MÉTODOS QUE LEVAM CONSIGO CUIDADOSAMENTE CADA DETALHE.",
  subtitlePresentation = "É com inabalável confiança no potencial de nossas peças com  alta performance, que oferecemos uma vasta gama de modelos e qualidade, desde os clássicos aos mais modernos que se adaptam a qualquer necessidade. Desvende as mais variadas soluções que irão mudar a sua vida.",
  titleBtn = "Descubra mais detalhes",
}) => {

  const Db = FrameDefault

  return (
    <>
      <GlobalStyle />
      <Header>
        <ImageBackground src={imageBackground} />
        <Container>
          <Logo rotaLink={'/'} logo={linkLogo} />

          <ArrowCnt>
            <ArrowDown src={ArrowDownImg} />
          </ArrowCnt>
        </Container>

      </Header>

      <Section className="presentation">
        <TitlePresentation>{titlePresentation}</TitlePresentation>
        <SubtitlePresentation>{subtitlePresentation}</SubtitlePresentation>
        <ButtonCnt>
          <ButtonOne >{titleBtn}</ButtonOne>
        </ButtonCnt>
      </Section>

      <CarrosselSecundary
        acessDb={Db.CarouselSecundario}
        titleCarrossel={Db.CarouselSecundarioTitle}
      />

      <Footer
        paginaInicial="https://www.lojadquirindo.com.br"
        prazoEntrega="7 e 21 dias úteis" />
    </>
  )
}

export default Home
