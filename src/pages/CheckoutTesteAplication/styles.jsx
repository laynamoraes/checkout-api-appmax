import styled, { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Montserrat', sans-serif;
  }
`

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff;
`

export const HeaderPromotion = styled.div`
  width: 100%;
  height: 60px;
  background-color: #070e2a;
  padding: 10px 0;
`

export const DivFlexHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const HeaderText = styled.p`
  font-size: 0.813rem;
  font-weight: 600;
  color: #fff;
`

export const CronometroStyle = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: #fcd742;
`

export const Content = styled.div`
  width: 100%;
  margin: 0 15px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 490px) {
    margin: 0;
    padding: 0 15px;
  }
`

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 10px 60px 20px 30px;

  @media screen and (max-width: 490px) {
    padding: 0;
  }
`

export const ImageGarantia = styled.img`
  width: 100%;
  max-width: 550px;

  @media screen and (min-width: 990px) {
    margin-top: 58px;
  }
`

export const DivFlex = styled.div`
  width: 100%;
  max-width: 530px;
  display: flex;
  gap: 15px;

  @media screen and (max-width: 490px) {
    flex-wrap: wrap;
    gap: 0;
  }
`

export const DivFlexNoWrap = styled.div`
  width: 100%;
  max-width: 530px;
  display: flex;
  gap: 15px;
`

export const TitleSection = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: left;
  color: #202223;
`

export const Text = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: left;
  margin-bottom: 10px;
  color: #a3a4a4;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 530px;

  input {
    font-weight: 400;
    color: #000;
    padding: 14px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 0.875rem;
    width: 100%;
  }

  span {
    width: 100%;
    padding: 10px 0;
    font-weight: 500;
    font-size: 0.875rem;
    color: #6d7175;
  }
`

export const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 530px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;

  input {
    width: 100%;
    max-width: 500px;
    font-size: 0.875rem;
    font-weight: 400;
    color: #000;
    padding: 14px 20px;
    margin-top: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .szh-accordion__item--status-entered h3 button div div {
    background-color: #40b76a;
    border: 1px solid #40b76a;
  }

  .szh-accordion__item {
    &-btn {
      cursor: pointer;
    }

    &-content {
      transition: height 0.5s ease-in-out;
    }
  }

  .szh-accordion__item-heading {
    width: 100%;
    max-width: 530px;
    padding: 10px 15px;
    margin-top: 5px;
  }

  .szh-accordion__item-btn {
    width: 100%;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: left;
    background-color: #fff;
    color: #202223;
    border: none;
  }

  .szh-accordion__item-content {
    padding: 15px;
    height: auto;
    border-top: 1px solid #d9d9d9;
  }
`

export const HeaderAccordion = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3px;
`

export const HeaderAccordionLeft = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

export const HeaderAccordionRight = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 25px;

  p {
    font-size: 0.75rem;
    font-weight: 400;
  }

  img {
    width: 40px;
  }
`

export const Checkbox = styled.div`
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  section {
    width: 4px;
    height: 4px;
    background-color: #fff;
    border-radius: 50%;
  }
`

export const SectionMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 530px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;

  @media screen and (min-width: 990px) {
    display: none;
  }

  img {
    width: 52px;
    height: 52px;
    border: 1px solid #c9c9c9;
    border-radius: 3px;
    padding: 3px;
  }

  div {
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.4px;
    color: #000;
  }

  p {
    font-size: 0.875rem;
  }

  .szh-accordion {
    width: 100%;
    padding: 5px 0;
  }

  .szh-accordion__item-heading {
    width: 100%;
    max-width: 530px;
    padding: 15px;

    button {
      font-size: 0.875rem;
      font-weight: 500;
      text-align: left;
      color: #202223;
      background-color: #fff;
      border: none;
    }
  }
`

export const SectionDesktop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 41.666667%;

  border-left: 1px solid #d9d9d9;
  padding: 30px;

  @media screen and (max-width: 990px) {
    display: none;
  }

  img {
    width: 60px;
    height: 60px;
    border: 1px solid #c9c9c9;
    border-radius: 3px;
    padding: 3px;
  }

  div {
    font-size: 0.813rem;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.4px;
    color: #000;
  }

  .szh-accordion {
    width: 100%;
    padding: 5px 0;
  }

  .szh-accordion__item-heading {
    width: 100%;
    max-width: 530px;
    padding: 15px;

    button {
      font-size: 0.875rem;
      font-weight: 500;
      text-align: left;
      color: #202223;
      background-color: #fff;
      border: none;
    }
  }
`

export const Quantidade = styled.div`
  width: 56px;
  min-height: 20px;
  border: 1px solid #eaedf1;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;

  @media screen and (min-width: 990px) {
    width: 90px;
    min-height: 40px;
    padding: 5px 10px;
    font-size: 0.813rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const Cupom = styled.div`
  width: 100%;
  font-size: 0.813rem;
  font-weight: 500;
  color: #1e55f5;
  padding: 15px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
`

export const ResumoPedido = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  div {
    padding: 15px 15px 0;
  }

  p {
    font-size: 0.813rem;
    font-weight: 500;
    margin-bottom: 10px;
  }

  @media screen and (min-width: 990px) {
    border-bottom: 1px solid #d9d9d9;
  }
`

export const Total = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #202223;

  @media screen and (min-width: 990px) {
    font-size: 1.063rem;
    color: #000;
  }
`

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`

export const ButtonCnt = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Button = styled.button`
  background-color: #40b76a;
  color: #fff;
  padding: 14px;
  margin: 20px 0;
  width: 100%;
  max-width: 400px;
  border: none;
  border-radius: 5px;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;

  display: flex;
  justify-content: center;
  gap: 5px;

  &:hover {
    opacity: 0.8;
  }
`

export const DivProtecao = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;

  @media screen and (max-width: 490px) {
    align-items: flex-start;
  }
`

export const DivError = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .error-border {
    border: 1px solid red;
  }
`

export const ErrorText = styled.p`
  font-size: 0.813rem;
  color: red;
  margin-top: -5px;
`

export const Beneficios = styled.div`
  width: 100%;
  max-width: 530px;
  margin-top: 44px;
  padding: 20px 25px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #202223;
    margin-bottom: 5px;
  }

  p {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    word-break: break-word;
  }

  img {
    width: 64px;
    height: 64px;
  }
`
