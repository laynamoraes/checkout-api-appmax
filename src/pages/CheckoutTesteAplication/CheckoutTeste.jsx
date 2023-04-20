import React, { useState, useEffect } from "react"
import InputMask from "react-input-mask"
import axios from "axios"
import * as cardValidator from "card-validator"
import CPF from "cpf-check"
import { Accordion } from "react-bootstrap-accordion"
// import "react-bootstrap-accordion/dist/index.css"
import "./styles"

import {
  BsShieldLockFill,
  BsCreditCard,
  BsFillPersonFill,
  BsCalendar,
} from "react-icons/bs"

import { FiLock } from "react-icons/fi"

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
  Cronometro,
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
          <Cronometro>00:00</Cronometro>
        </DivFlexHeader>
      </HeaderPromotion>

      <Content>
        <FormWrapper className="formulario" onSubmit={handleSubmit}>
          <ImageGarantia
            src="https://assets.mycartpanda.com/static/theme_images/d0/0d/07/290462_0670611796.png"
            alt="Selo de Garantia"
          />

          <SectionMobile>
            <Accordion title="Resumo do pedido" show>
              <div
                id="detalhesProduto"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "10px 0 25px 0",
                }}
              >
                <img
                  src="https://thumbor.cartpanda.com/OiCUsJv_s3NQdbJmD-4oUX6yKTA=/64x0/https://assets.mycartpanda.com/static/products_images/2xO8vbpB6kJ6W4ieo2VvEJiyg4qYZl.jpg"
                  alt="Imagem do Produto"
                />
                <p>
                  BoneLink 7.1™ - COMPRE 1<br />
                  LEVE 2
                </p>
                <div
                  style={{
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
                  <Quantidade>- &nbsp;&nbsp; 1 &nbsp;&nbsp; +</Quantidade>
                </div>
              </div>
              <Cupom id="cupom">Tem cupom de desconto ou vale presente?</Cupom>
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

            <InputWrapper>
              <InputMask
                type="text"
                id="cpf"
                mask="999.999.999-99"
                maskChar={null}
                value={cpf}
                onBlur={validateCPF}
                onChange={(event) => setCpf(event.target.value)}
                placeholder="CPF*"
              />
            </InputWrapper>

            {errorCPF && (
              <InputWrapper>
                <span>{errorCPF}</span>
              </InputWrapper>
            )}
          </DivFlex>

          <TitleSection>Informações de Entrega</TitleSection>
          <Text>Para onde devemos entregar o pedido?</Text>

          <InputWrapper style={{ flexDirection: "row", alignItems: "center" }}>
            <InputMask
              style={{ maxWidth: "186px" }}
              mask="99999-999"
              maskChar={null}
              id="cep"
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

          {errorCEP && (
            <InputWrapper>
              <span>{errorCEP}</span>
            </InputWrapper>
          )}
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
            <Accordion title="Cartão de crédito" show>
              <DivFlex>
                {/* <BsCreditCard
                  fill="#BBBBBB"
                  style={{ position: "absolute", margin: "15px 17px" }}
                /> */}
                <InputMask
                  style={{ paddingLeft: "45px" }}
                  mask="9999 9999 9999 9999"
                  maskChar={null}
                  id="creditCard"
                  placeholder="Número do cartão"
                  onChange={handleCardValidation}
                />
              </DivFlex>
              {errorCard && (
                <InputWrapper>
                  <span>{errorCard}</span>
                </InputWrapper>
              )}

              <DivFlex>
                {/* <BsFillPersonFill
                  fill="#BBBBBB"
                  style={{ position: "absolute", margin: "15px 17px" }}
                /> */}
                <InputMask
                  id="nameCard"
                  placeholder="Nome impresso no cartão"
                  style={{ paddingLeft: "45px" }}
                />
              </DivFlex>
              <DivFlexNoWrap>
                <InputWrapper>
                  <DivFlex>
                    {/* <BsCalendar
                      fill="#BBBBBB"
                      style={{ position: "absolute", margin: "15px 17px" }}
                    /> */}
                    <InputMask
                      style={{ paddingLeft: "45px" }}
                      mask="99/99"
                      maskChar={null}
                      id="validityCard"
                      placeholder="MM/AA"
                    />
                  </DivFlex>
                </InputWrapper>

                <InputWrapper>
                  <DivFlex>
                    {/* <FiLock
                      color="#BBBBBB"
                      style={{ position: "absolute", margin: "15px 17px" }}
                    /> */}
                    <InputMask
                      style={{ paddingLeft: "45px" }}
                      mask="9999"
                      maskChar={null}
                      id="codeCard"
                      placeholder="CVV"
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
                <Text
                  style={{
                    color: "#28363d",
                    fontSize: "0.813rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <FiLock />
                  Protegemos seus dados de pagamento usando encriptação de alto
                  nível
                </Text>
              </ButtonCnt>
            </Accordion>

            <InputWrapper
              className="formPayPix"
              style={{ borderTop: "1px solid #d9d9d9" }}
            >
              <Accordion title="PIX 12% OFF">
                <Text style={{ color: "#000", marginBottom: "20px" }}>
                  Clique em "Finalizar Compra" para gerar o PIX.
                </Text>
                <Text style={{ color: "#000", marginBottom: "20px" }}>
                  Informações sobre o pagamento via PIX:
                </Text>
                <ul style={{ marginLeft: "40px" }}>
                  <li>
                    <Text style={{ color: "#000", lineHeight: "1" }}>
                      Valor à vista R$ 87,91;
                    </Text>
                  </li>
                  <li>
                    <Text style={{ color: "#000", lineHeight: "1" }}>
                      Não pode ser parcelado! Use cartão de crédito para
                      parcelar sua compra;
                    </Text>
                  </li>
                  <li>
                    <Text style={{ color: "#000", lineHeight: "1" }}>
                      Prazo de até 30 minutos para compensar.
                    </Text>
                  </li>
                </ul>
                <ButtonCnt>
                  <Button onClick={formFirst}>
                    <FiLock />
                    FINALIZAR COMPRA
                  </Button>
                  <Text
                    style={{
                      color: "#28363d",
                      fontSize: "0.813rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <FiLock />
                    Protegemos seus dados de pagamento usando encriptação de
                    alto nível
                  </Text>
                </ButtonCnt>
              </Accordion>
            </InputWrapper>
          </AccordionWrapper>
        </FormWrapper>
      </Content>
    </Container>
  )
}

export default Formulario
