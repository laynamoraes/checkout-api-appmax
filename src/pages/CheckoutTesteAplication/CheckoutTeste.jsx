import React, { useState, useEffect } from "react"
import InputMask from "react-input-mask"
import axios from "axios"
import * as cardValidator from "card-validator"
import CPF from "cpf-check"
import Cronometro from "./Cronometro"
import ImageSecurity from "./assets/security.png"
import ImageFeedback from "./assets/feedback-positive.png"
import ImageReembolso from "./assets/reembolso.png"
import ImageCards from "./assets/cards.png"
import "./styles"

import { Accordion, AccordionItem } from "@szhsin/react-accordion"

import {
  BsShieldLockFill,
  BsCreditCard,
  BsFillPersonFill,
  BsCalendar,
} from "react-icons/bs"

import { FiLock } from "react-icons/fi"
import { IoIosArrowUp } from "react-icons/io"
import { MdSecurity } from "react-icons/md"
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDinersClub,
} from "react-icons/fa"

import {
  Container,
  FormWrapper,
  InputWrapper,
  Label,
  Button,
  GlobalStyle,
  HeaderPromotion,
  HeaderText,
  DivFlex,
  CronometroStyle,
  Content,
  ImageGarantia,
  TitleSection,
  Text,
  DivFlexHeader,
  DivFlexNoWrap,
  AccordionWrapper,
  ButtonCnt,
  SectionMobile,
  Quantidade,
  Cupom,
  ResumoPedido,
  Total,
  Checkbox,
  HeaderAccordion,
  SectionDesktop,
  DivProtecao,
  DivError,
  ErrorText,
  HeaderAccordionLeft,
  HeaderAccordionRight,
  Beneficios,
  ImageLoja,
} from "./styles"

function Formulario() {
  const acessToken = "8D479FDE-06804C4D-CE2E17D2-8180D7D1"
  const [nomeCompleto, setNomeCompleto] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")

  const [cep, setCep] = useState("")
  const [cpf, setCpf] = useState("")
  const [logradouro, setLogradouro] = useState("")
  const [bairro, setBairro] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")
  const [showAddress, setShowAddress] = useState("")

  const [nameCard, setNameCard] = useState("")
  const [numberCard, setNumberCard] = useState("")
  const [validityCard, setValidityCard] = useState("")
  const [cvvCard, setCvvCard] = useState("")

  const [errorCEP, setErrorCEP] = useState("")
  const [errorCard, setErrorCard] = useState("")
  const [errorCPF, setErrorCPF] = useState("")

  const [ipAddress, setIpAddress] = useState("")

  useEffect(() => {
    async function fetchIpAddress() {
      const response = await axios.get("https://api.ipify.org?format=json")

      setIpAddress(response.data.ip)
    }

    fetchIpAddress()
  }, [])

  function formFirst(event) {
    event.preventDefault()

    const [firstName, ...lastName] = nomeCompleto.split(" ")
    const postCostumer = {
      "acess-token": acessToken,
      firstname: firstName,
      lastname: lastName.join(" "),
      email: email,
      telephone: telefone,
      postcode: cep,
      address_street: logradouro,
      address_street_number: numero,
      address_street_complement: complemento,
      address_street_district: bairro,
      address_city: cidade,
      address_state: estado,
      ip: ipAddress,
      custom_txt: "Tênis de Corrida 39",
      products: [
        {
          product_sku: "123456",
          product_qty: 2,
        },
      ],
      tracking: {
        utm_source: "google",
        utm_campaign: "black-friday",
        utm_medium: "cpc",
        utm_content: "tenis-corrida",
        utm_term: "logo-link",
      },
    }

    const [monthCard, yearCard] = validityCard.split("/")
    const postCreditCard = {
      "access-token": acessToken,
      cart: {
        order_id: 345678,
      },
      customer: {
        customer_id: 123456,
      },
      payment: {
        CreditCard: {
          number: numberCard,
          cvv: cvvCard,
          month: monthCard,
          year: yearCard,
          document_number: "191.000.000-00",
          name: nameCard,
          installments: 12,
          soft_descriptor: "MYSTORE",
        },
      },
    }

    console.log(postCreditCard)

    console.log(postCostumer)

    const cpfValue = cpf
    // Fazer o que desejar com o valor do CPF, como armazenar em uma variável
  }

  const handleCepChange = async (event) => {
    const { value } = event.target
    setCep(value)

    if (value.length === 9) {
      axios
        .get(`https://viacep.com.br/ws/${value.replace("-", "")}/json/`)
        .then((response) => {
          console.log(response)
          const { logradouro, bairro, localidade, uf } = response.data
          if (response.data.erro) {
            setErrorCEP("CEP não encontrado")
            setShowAddress(false)
          } else {
            setLogradouro(logradouro)
            setBairro(bairro)
            setCidade(localidade)
            setEstado(uf)
            setShowAddress(true)
            setErrorCEP("")
          }
        })
        .catch((error) => {
          console.error(error)
          setShowAddress(false)
          setErrorCEP("Erro ao buscar o CEP")
        })
    } else {
      setShowAddress(false)
      setErrorCEP("")
    }
  }

  function handleCardValidation(event) {
    event.preventDefault()
    const cardNumber = event.target.value

    const cardValidation = cardValidator.number(cardNumber)

    // const cardType = cardValidator.number(cardNumber).card.type

    if (!cardValidation.isValid && cardNumber.length === 19) {
      setErrorCard(
        "Número de cartão de crédito inválido. Por favor, verificar e corrigir."
      )
    } else {
      setErrorCard("")
    }

    // teste de bandeira do cartão
    // if (cardType === "visa") {
    //   console.log("cartão VISA")
    // } else if (cardType === "mastercard") {
    //   console.log("cartão MASTERCARD")
    // }

    console.log("Cartão válido")
  }

  function validateCPF() {
    if (CPF.validate(cpf)) {
      setErrorCPF("")
    } else {
      setErrorCPF("CPF inválido")
    }
  }

  function handleSubmit() {
    formFirst()
  }

  return (
    <Container>
      <GlobalStyle />
      <HeaderPromotion>
        <DivFlexHeader style={{ marginBottom: "8px" }}>
          <BsShieldLockFill fill="#50A756" style={{ marginRight: "5px" }} />
          <HeaderText>COMPRA 100% SEGURA</HeaderText>
        </DivFlexHeader>
        <DivFlexHeader>
          <HeaderText style={{ marginRight: "5px" }}>
            Promoção especial encerra em:
          </HeaderText>
          <CronometroStyle>
            <Cronometro />
          </CronometroStyle>
        </DivFlexHeader>
      </HeaderPromotion>

      <Content>
        <FormWrapper className="formulario" onSubmit={handleSubmit}>
          <ImageGarantia
            src="https://assets.mycartpanda.com/static/theme_images/d0/0d/07/290462_0670611796.png"
            alt="Selo de Garantia"
          />

          <SectionMobile>
            <Accordion>
              <AccordionItem
                header={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <IoIosArrowUp fill="#897977" />
                    <p>Resumo do Pedido</p>
                  </div>
                }
                initialEntered
              >
                <div
                  id="detalhesProduto"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "15px",
                    borderTop: "1px solid #ccc",
                  }}
                >
                  <img
                    src="https://thumbor.cartpanda.com/OiCUsJv_s3NQdbJmD-4oUX6yKTA=/64x0/https://assets.mycartpanda.com/static/products_images/2xO8vbpB6kJ6W4ieo2VvEJiyg4qYZl.jpg"
                    alt="Imagem do Produto"
                  />
                  <div style={{ padding: "0 15px", width: "100%" }}>
                    BoneLink 7.1™ - COMPRE 1 LEVE 2
                  </div>
                  <div
                    style={{
                      width: "65%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "5px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#202223",
                      }}
                    >
                      R$ 99,90
                    </p>
                    <Quantidade>
                      <button>-</button>
                      <input type="number" name="quantity" value={1} min={1} />
                      <button>+</button>
                    </Quantidade>
                  </div>
                </div>
                <Cupom id="cupom" style={{ color: "#1e55f5" }}>
                  Tem cupom de desconto ou vale presente?
                </Cupom>
                <ResumoPedido id="resumoPedido">
                  <div>
                    <p>Subtotal</p>
                    <p>Entrega</p>
                    <p>Desconto cartão</p>
                    <Total>Total</Total>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <p>R$ 99,90</p>
                    <p>---</p>
                    <p>- R$ 0,00</p>
                    <Total>12x de R$ 10,03*</Total>
                    <p style={{ fontSize: "0.625rem" }}>OU R$ 99,90 À VISTA</p>
                  </div>
                </ResumoPedido>
              </AccordionItem>
            </Accordion>
          </SectionMobile>

          <TitleSection>Informações Pessoais</TitleSection>
          <Text>Para quem devemos entregar o pedido?</Text>
          <InputWrapper>
            <InputMask
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="E-mail*"
            />
          </InputWrapper>
          <InputWrapper>
            <InputMask
              type="text"
              id="nomeCompleto"
              value={nomeCompleto}
              onChange={(event) => setNomeCompleto(event.target.value)}
              placeholder="Nome completo*"
            />
          </InputWrapper>

          <DivFlex style={{ marginBottom: "36px" }}>
            <InputWrapper>
              <InputMask
                type="tel"
                id="telefone"
                mask="(99) 99999-9999"
                maskChar={null}
                value={telefone}
                onChange={(event) => setTelefone(event.target.value)}
                placeholder="Celular*"
              />
            </InputWrapper>

            <DivError>
              <InputWrapper>
                <InputMask
                  type="text"
                  id="cpf"
                  className={errorCPF ? "error-border" : ""}
                  mask="999.999.999-99"
                  maskChar={null}
                  value={cpf}
                  onBlur={validateCPF}
                  onChange={(event) => setCpf(event.target.value)}
                  placeholder="CPF*"
                />
              </InputWrapper>
              {errorCPF && <ErrorText>{errorCPF}</ErrorText>}
            </DivError>
          </DivFlex>

          <TitleSection>Informações de Entrega</TitleSection>
          <Text>Para onde devemos entregar o pedido?</Text>

          <DivError>
            <InputWrapper
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <InputMask
                style={{ maxWidth: "186px" }}
                mask="99999-999"
                maskChar={null}
                id="cep"
                className={errorCEP ? "error-border" : ""}
                placeholder="CEP*"
                value={cep}
                onChange={handleCepChange}
              />
              {showAddress && logradouro && bairro && cidade && estado && (
                <span>
                  {cidade}/{estado}
                </span>
              )}
            </InputWrapper>

            {errorCEP && <ErrorText>{errorCEP}</ErrorText>}
          </DivError>

          {showAddress && logradouro && bairro && cidade && estado && (
            <div>
              <DivFlex>
                <InputWrapper style={{ width: "250%" }}>
                  <InputMask
                    type="text"
                    id="logradouro"
                    placeholder="Endereço*"
                    value={logradouro}
                    onChange={(event) => setLogradouro(event.target.value)}
                  />
                </InputWrapper>

                <InputWrapper>
                  <InputMask
                    type="text"
                    id="numero"
                    placeholder="Número*"
                    onChange={(event) => setNumero(event.target.value)}
                  />
                </InputWrapper>
              </DivFlex>

              <DivFlex>
                <InputWrapper style={{ width: "250%" }}>
                  <InputMask
                    type="text"
                    id="bairro"
                    placeholder="Bairro*"
                    value={bairro}
                    onChange={(event) => setBairro(event.target.value)}
                  />
                </InputWrapper>

                <InputWrapper>
                  <InputMask
                    type="text"
                    id="complemento"
                    placeholder="Complemento"
                    value={complemento}
                    onChange={(event) => setComplemento(event.target.value)}
                  />
                </InputWrapper>
              </DivFlex>
            </div>
          )}

          <TitleSection style={{ marginTop: "36px" }}>
            Método de Pagamento
          </TitleSection>
          <Text>Escolha o seu método de pagamento abaixo</Text>

          <AccordionWrapper className="formPay">
            <Accordion>
              <AccordionItem
                header={
                  <HeaderAccordion>
                    <HeaderAccordionLeft>
                      <Checkbox>
                        <section></section>
                      </Checkbox>
                      <p>Cartão de crédito</p>
                    </HeaderAccordionLeft>
                    <HeaderAccordionRight>
                      <FaCcVisa size={25} fill="#142688" />
                      <FaCcAmex size={25} fill="#006FCF" />
                      <FaCcMastercard size={25} />
                      <FaCcDinersClub size={25} fill="#3086C8" />
                      <p>E mais...</p>
                    </HeaderAccordionRight>
                  </HeaderAccordion>
                }
                initialEntered
              >
                <DivError>
                  <DivFlex>
                    <BsCreditCard
                      fill="#BBBBBB"
                      style={{ position: "absolute", margin: "27px 17px" }}
                    />
                    <InputMask
                      style={{ paddingLeft: "45px" }}
                      mask="9999 9999 9999 9999"
                      maskChar={null}
                      id="creditCard"
                      className={errorCard ? "error-border" : ""}
                      placeholder="Número do cartão"
                      value={numberCard}
                      onBlur={handleCardValidation}
                      onChange={(event) => setNumberCard(event.target.value)}
                    />
                  </DivFlex>
                  {errorCard && (
                    <ErrorText style={{ marginTop: "3px" }}>
                      {errorCard}
                    </ErrorText>
                  )}
                </DivError>

                <DivFlex>
                  <BsFillPersonFill
                    fill="#BBBBBB"
                    style={{ position: "absolute", margin: "27px 17px" }}
                  />
                  <InputMask
                    id="nameCard"
                    placeholder="Nome impresso no cartão"
                    style={{ paddingLeft: "45px" }}
                    value={nameCard}
                    onChange={(event) => setNameCard(event.target.value)}
                  />
                </DivFlex>
                <DivFlexNoWrap>
                  <InputWrapper>
                    <DivFlex>
                      <BsCalendar
                        fill="#BBBBBB"
                        style={{ position: "absolute", margin: "26px 17px" }}
                      />
                      <InputMask
                        style={{ paddingLeft: "45px" }}
                        mask="99/99"
                        maskChar={null}
                        id="validityCard"
                        placeholder="MM/AA"
                        value={validityCard}
                        onChange={(event) =>
                          setValidityCard(event.target.value)
                        }
                      />
                    </DivFlex>
                  </InputWrapper>

                  <InputWrapper>
                    <DivFlex>
                      <FiLock
                        color="#BBBBBB"
                        style={{ position: "absolute", margin: "26px 17px" }}
                      />
                      <InputMask
                        style={{ paddingLeft: "45px" }}
                        mask="9999"
                        maskChar={null}
                        id="codeCard"
                        placeholder="CVV"
                        value={cvvCard}
                        onChange={(event) => setCvvCard(event.target.value)}
                      />
                    </DivFlex>
                  </InputWrapper>
                </DivFlexNoWrap>
                <InputMask id="payCard" placeholder="Parcelas" />
                <ButtonCnt>
                  <Button onClick={formFirst}>
                    <FiLock />
                    FINALIZAR COMPRA
                  </Button>
                  <DivProtecao>
                    <div>
                      <MdSecurity size={16} color="#28363d" />
                    </div>
                    <Text
                      style={{
                        fontSize: "0.75rem",
                        color: "#28363d",
                        marginBottom: "0",
                      }}
                    >
                      Protegemos seus dados de pagamento usando encriptação de
                      alto nível
                    </Text>
                  </DivProtecao>
                </ButtonCnt>
              </AccordionItem>

              <InputWrapper
                className="formPayPix"
                style={{ borderTop: "1px solid #d9d9d9" }}
              >
                <AccordionItem
                  header={
                    <HeaderAccordion>
                      <HeaderAccordionLeft>
                        <Checkbox>
                          <section></section>
                        </Checkbox>
                        <p>PIX 12% OFF</p>
                      </HeaderAccordionLeft>
                      <HeaderAccordionRight>
                        <img
                          src="https://adquirindo.mycartpanda.com/images/payment/pix.svg"
                          alt="Ícone do Pix"
                        />
                      </HeaderAccordionRight>
                    </HeaderAccordion>
                  }
                >
                  <Text style={{ color: "#000", marginBottom: "20px" }}>
                    Clique em "Finalizar Compra" para gerar o PIX.
                  </Text>
                  <Text style={{ color: "#000", marginBottom: "20px" }}>
                    Informações sobre o pagamento via PIX:
                  </Text>
                  <ul style={{ marginLeft: "40px" }}>
                    <li>
                      <Text
                        style={{
                          color: "#000",
                          lineHeight: "1",
                          marginBottom: "5px",
                        }}
                      >
                        Valor à vista <strong>R$ 87,91</strong>;
                      </Text>
                    </li>
                    <li>
                      <Text
                        style={{
                          color: "#000",
                          lineHeight: "1",
                          marginBottom: "5px",
                        }}
                      >
                        Não pode ser parcelado! Use cartão de crédito para
                        parcelar sua compra;
                      </Text>
                    </li>
                    <li>
                      <Text
                        style={{
                          color: "#000",
                          lineHeight: "1",
                          marginBottom: "15px",
                        }}
                      >
                        Prazo de até 30 minutos para compensar.
                      </Text>
                    </li>
                  </ul>
                  <ButtonCnt>
                    <Button onClick={formFirst}>
                      <FiLock />
                      FINALIZAR COMPRA
                    </Button>
                    <DivProtecao>
                      <div>
                        <MdSecurity size={16} color="#28363d" />
                      </div>
                      <Text
                        style={{
                          fontSize: "0.75rem",
                          color: "#28363d",
                          marginBottom: "0",
                        }}
                      >
                        Protegemos seus dados de pagamento usando encriptação de
                        alto nível
                      </Text>
                    </DivProtecao>
                  </ButtonCnt>
                </AccordionItem>
              </InputWrapper>
            </Accordion>
          </AccordionWrapper>

          <Beneficios>
            <p>Benefícios exclusivos para você:</p>
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
                marginTop: "25px",
              }}
            >
              <div>
                <img src={ImageSecurity} alt="Ícone Pagamento Seguro" />
              </div>
              <div>
                <h3>Pagamento 100% Seguro</h3>
                <p>
                  Nossos pagamentos são processados pelo AppMax, a plataforma de
                  pagamentos online mais segura da América Latina.
                </p>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
                marginTop: "25px",
              }}
            >
              <div>
                <img src={ImageFeedback} alt="Ícone avaliações positivas" />
              </div>
              <div>
                <h3>Avaliações Positivas</h3>
                <p>
                  Histórico excelente de atendimento ao cliente. Já são mais de
                  12.000 pedidos entregues em todo Brasil.
                </p>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
                marginTop: "25px",
              }}
            >
              <div>
                <img src={ImageReembolso} alt="Ícone de reembolso" />
              </div>
              <div>
                <h3>Garantia de Reembolso</h3>
                <p>
                  Receba sua compra ou nossa equipe devolverá todo seu dinheiro
                  de volta na sua conta em poucos minutos.
                </p>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
                marginTop: "25px",
              }}
            >
              <div>
                <img src={ImageCards} alt="Ícone de cartões" />
              </div>
              <div>
                <h3>Parcele em até 12x no cartão</h3>
                <p>
                  As compras realizadas pelo cartão de crédito possuem segurança
                  antifraude. Por o pagamento debitar na hora, é processado e
                  enviado mais rapidamente.
                </p>
              </div>
            </div>
          </Beneficios>

          <ImageLoja>
            <img
              src="https://assets.mycartpanda.com/static/theme_images/d0/0d/07/290462_2797921766.png"
              alt=""
            />
          </ImageLoja>
        </FormWrapper>

        <SectionDesktop>
          <div
            id="detalhesProduto"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "15px",
            }}
          >
            <img
              src="https://thumbor.cartpanda.com/OiCUsJv_s3NQdbJmD-4oUX6yKTA=/64x0/https://assets.mycartpanda.com/static/products_images/2xO8vbpB6kJ6W4ieo2VvEJiyg4qYZl.jpg"
              alt="Imagem do Produto"
            />
            <div style={{ padding: "0 15px", width: "100%" }}>
              BoneLink 7.1™ - COMPRE 1 LEVE 2
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  letterSpacing: "0.4px",
                  color: "#202223",
                  marginTop: "3px",
                }}
              >
                R$ 99,90
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "5px",
              }}
            >
              <Quantidade style={{ fontWeight: "600" }}>
                - &nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp; +
              </Quantidade>
            </div>
          </div>
          <Cupom id="cupom" style={{ color: "#1e55f5", fontSize: "0.75rem" }}>
            Tem cupom de desconto ou vale presente?
          </Cupom>
          <ResumoPedido id="resumoPedido">
            <div>
              <p>Subtotal</p>
              <p>Entrega</p>
              <p>Desconto cartão</p>
              <Total>Total</Total>
            </div>
            <div style={{ textAlign: "end" }}>
              <p>R$ 99,90</p>
              <p>---</p>
              <p>- R$ 0,00</p>
              <Total>12x de R$ 10,03*</Total>
              <p style={{ fontSize: "0.625rem" }}>OU R$ 99,90 À VISTA</p>
            </div>
          </ResumoPedido>
        </SectionDesktop>
      </Content>
    </Container>
  )
}

export default Formulario
