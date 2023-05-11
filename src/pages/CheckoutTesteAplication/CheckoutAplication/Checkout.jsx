import React, { useState, useEffect } from "react"
import InputMask from "react-input-mask"
import axios from "axios"
import * as cardValidator from "card-validator"
import CPF from "cpf-check"
import Cronometro from "./CronometroCheckout"
import ImageSecurity from "../assets/security.png"
import ImageFeedback from "../assets/feedback-positive.png"
import ImageReembolso from "../assets/reembolso.png"
import ImageCards from "../assets/cards.png"
import ImageBoleto from "../assets/boleto.svg"
import { productsData } from "./productsData"
import { useNavigate } from "react-router-dom"
import { addMinutes, format, parse } from "date-fns"
import Loading from "../Loading/loading"
import "./styles"

import {
  Accordion,
  AccordionItem,
  ControlledAccordion,
  useAccordionProvider,
} from "@szhsin/react-accordion"

import {
  BsShieldLockFill,
  BsCreditCard,
  BsFillPersonFill,
  BsCalendar,
} from "react-icons/bs"

import { FiLock } from "react-icons/fi"
import { AiFillAlert } from "react-icons/ai"
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
  Parcelas,
  ImageGarantiaCnt,
  PagamentoNegado,
  Wrapper,
  DivErrorInputs,
} from "./styles"
import { useParams } from "react-router-dom"

function Checkout() {
  // Token de produção
  const accessToken = "A34B7F16-EC737AA7-F5C01F9C-8AA6C0A5"

  // Token de teste
  // const accessToken = "8D479FDE-06804C4D-CE2E17D2-8180D7D1"
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
  const [errorPagamento, setErrorPagamento] = useState("")
  const [errorInputs, setErrorInputs] = useState("")

  const [showLoading, setShowLoading] = useState(false)
  const [ipAddress, setIpAddress] = useState("")

  // Capturar IP Cliente
  useEffect(() => {
    async function fetchIpAddress() {
      const response = await axios.get("https://api.ipify.org?format=json")

      setIpAddress(response.data.ip)
    }

    fetchIpAddress()
  }, [])

  const handleCepChange = async (event) => {
    const { value } = event.target
    setCep(value)

    if (value.length === 9) {
      axios
        .get(`https://viacep.com.br/ws/${value.replace("-", "")}/json/`)
        .then((response) => {
          // console.log(response)
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
  }

  function validateCPF() {
    if (CPF.validate(cpf)) {
      setErrorCPF("")
    } else {
      setErrorCPF("CPF inválido")
    }
  }

  const { id } = useParams()
  const produto = productsData.find((p) => p.id == id)

  // configuração do Accordion de parcelamento
  const providerValue = useAccordionProvider({
    transition: true,
    transitionTimeout: 150,
  })

  const { toggle } = providerValue

  // Seleção de Pix, Cartão ou Boleto
  const [selectedCard, setSelectedCard] = useState(true)
  const [selectedPix, setSelectedPix] = useState(false)
  const [selectedBoleto, setSelectedBoleto] = useState(false)

  const selectCardClick = () => {
    setSelectedCard(true)
    setSelectedPix(false)
    setSelectedBoleto(false)
  }

  const selectPixClick = () => {
    setSelectedPix(true)
    setSelectedCard(false)
    setSelectedBoleto(false)
  }

  const selectBoletoClick = () => {
    setSelectedBoleto(true)
    setSelectedPix(false)
    setSelectedCard(false)
  }

  // Parcelas
  // estado que armazenda a quantidade parcelas 👇🏻
  const [selectedKey, setSelectedKey] = useState(12)

  const [itemCount, setItemCount] = useState(1)

  const handleSetItemCount = (total) => {
    setItemCount(total)
    setSelectedOption(
      options(total).find((item) => item.key === selectedKey).value
    )
  }

  const options = (itemCount) => [
    {
      key: 1,
      value: `1x de R$ ${(itemCount * produto.preco)
        .toString()
        .replace(".", ",")}`,
      priceProduct: itemCount * produto.preco,
    },
    {
      key: 2,
      value: `2x de R$ ${(parseFloat(produto.preco2x()) * itemCount)
        .toFixed(2)
        .toString()
        .replace(".", ",")}*`,
    },
    {
      key: 3,
      value: `3x de R$ ${(parseFloat(produto.preco3x()) * itemCount)
        .toFixed(2)
        .toString()
        .replace(".", ",")}*`,
    },
    {
      key: 4,
      value: `4x de R$ ${(parseFloat(produto.preco4x()) * itemCount)
        .toFixed(2)
        .toString()
        .replace(".", ",")}*`,
    },
    {
      key: 5,
      value: `5x de R$ ${(parseFloat(produto.preco5x()) * itemCount)
        .toFixed(2)
        .toString()
        .replace(".", ",")}*`,
    },
    {
      key: 6,
      value: `6x de R$ ${(parseFloat(produto.preco6x()) * itemCount)
        .toFixed(2)
        .toString()
        .replace(".", ",")}*`,
    },
    {
      key: 7,
      value: `7x de R$ ${(parseFloat(produto.preco7x()) * itemCount)
        .toFixed(2)
        .toString()
        .replace(".", ",")}*`,
    },
    {
      key: 8,
      value: `8x de R$ ${(parseFloat(produto.preco8x()) * itemCount)
        .toFixed(2)
        .toString()
        .replace(".", ",")}*`,
    },
    {
      key: 9,
      value: `9x de R$ ${(parseFloat(produto.preco9x()) * itemCount)
        .toFixed(2)
        .toString()
        .replace(".", ",")}*`,
    },
    {
      key: 10,
      value: `10x de R$ ${(parseFloat(produto.preco10x()) * itemCount)
        .toFixed(2)
        .toString()
        .replace(".", ",")}*`,
    },
    {
      key: 11,
      value: `11x de R$ ${(parseFloat(produto.preco11x()) * itemCount)
        .toFixed(2)
        .toString()
        .replace(".", ",")}*`,
    },
    {
      key: 12,
      value: `12x de R$ ${(parseFloat(produto.preco12x()) * itemCount)
        .toFixed(2)
        .toString()
        .replace(".", ",")}*`,
      priceProduct: parseFloat(produto.preco12x()) * 12 * itemCount,
    },
  ]

  const [selectedOption, setSelectedOption] = useState(
    options(itemCount)[11].value
  )

  const handleOptionClick = (optionValue, optionKey) => {
    setSelectedOption(optionValue)
    setSelectedKey(optionKey)
    toggle("item-4")
    console.log(optionValue)
    console.log(optionKey)
  }

  const navigate = useNavigate()
  const [dataFromApi, setDataFromApi] = useState(null)

  function handleSubmitCredit() {
    const [firstName, ...lastName] = nomeCompleto.split(" ")
    const [monthCard, yearCard] = validityCard.split("/")

    const monthCardNumber = parseInt(monthCard)
    const yearCardNumber = parseInt(yearCard)

    const postCustomer = {
      "access-token": accessToken,
      firstname: firstName,
      lastname: lastName.join(" "),
      document_number: cpf,
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
    }

    const headers = {
      "access-token": accessToken,
    }

    if (
      (nomeCompleto &&
        email &&
        telefone &&
        cpf &&
        cep &&
        numero &&
        numberCard &&
        cvvCard &&
        monthCardNumber &&
        yearCardNumber &&
        nameCard) != ""
    ) {
      axios
        .post("https://admin.appmax.com.br/api/v3/customer", postCustomer, {
          headers,
        })
        .then((response) => {
          console.log(response.data, "CLIENTE ✅")
          setShowLoading(true)

          const postOrder = {
            "access-token": accessToken,
            total: produto.preco,
            products: [
              {
                sku: produto.id,
                name: produto.nome,
                qty: itemCount,
              },
            ],
            customer_id: response.data.data.id,
          }
          axios
            .post("https://admin.appmax.com.br/api/v3/order", postOrder, {
              headers,
            })
            .then((response) => {
              console.log(response.data, "ORDEM ✅")

              const orderId = response.data.data.id

              const paymentForm = {
                "access-token": accessToken,
                cart: {
                  order_id: response.data.data.id,
                },
                customer: {
                  customer_id: response.data.data.customer_id,
                },
                payment: {
                  CreditCard: {
                    number: numberCard.replace(/\s+/g, ""),
                    cvv: cvvCard,
                    month: monthCardNumber,
                    year: yearCardNumber,
                    document_number: cpf,
                    name: nameCard,
                    installments: selectedKey,
                  },
                },
              }
              axios
                .post(
                  `https://admin.appmax.com.br/api/v3/payment/credit-card`,
                  paymentForm,
                  { headers }
                )
                .then((response) => {
                  console.log(response.data, "DEU CERTO O PAGAMENTO ✅")

                  setDataFromApi(response.data)

                  navigate("/payment-credit-card", {
                    state: {
                      dataFromApi: response.data,
                      orderId,
                      accessToken,
                    },
                  })
                })
                .catch((error) => {
                  console.error(error, "DEU ERRADO")
                  setErrorPagamento("Pagamento negado")
                  setShowLoading(false)
                })
            })
            .catch((error) => {
              console.error(error)
            })
        })
        .catch((error) => {
          console.error(error)
        })
      setErrorInputs("")
    } else {
      setErrorInputs("Por favor, preencha todos os campos")
    }
  }

  function handleSubmitPix() {
    const [firstName, ...lastName] = nomeCompleto.split(" ")

    // manipulação para data de expiração do PIX
    const dataAtual = new Date().toLocaleString()
    const dataAtualFormat = parse(dataAtual, "dd/MM/yyyy, HH:mm:ss", new Date())
    const dataExpiracao = addMinutes(dataAtualFormat, 31)
    const dataExpiracaoJSON = format(dataExpiracao, "yyyy-MM-dd HH:mm:ss")

    // preço no PIX
    const precoPix = parseFloat(produto.precoPix())
    const precoFinalPix = parseFloat((precoPix * itemCount).toFixed(2))

    const postCustomer = {
      "access-token": accessToken,
      firstname: firstName,
      lastname: lastName.join(" "),
      document_number: cpf,
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
    }

    const headers = {
      "access-token": accessToken,
    }

    if ((nomeCompleto && email && telefone && cpf && cep && numero) != "") {
      axios
        .post("https://admin.appmax.com.br/api/v3/customer", postCustomer, {
          headers,
        })
        .then((response) => {
          console.log(response.data, "CLIENTE ✅")
          setShowLoading(true)

          const postOrder = {
            "access-token": accessToken,
            total: precoFinalPix,
            products: [
              {
                sku: produto.id,
                name: produto.nome,
                qty: itemCount,
              },
            ],
            customer_id: response.data.data.id,
          }
          axios
            .post("https://admin.appmax.com.br/api/v3/order", postOrder, {
              headers,
            })
            .then((response) => {
              console.log(response.data, "ORDEM ✅")

              const orderId = response.data.data.id

              const paymentForm = {
                "access-token": accessToken,
                cart: {
                  order_id: response.data.data.id,
                },
                customer: {
                  customer_id: response.data.data.customer_id,
                },
                payment: {
                  pix: {
                    document_number: cpf,
                    expiration_date: dataExpiracaoJSON,
                  },
                },
              }
              axios
                .post(
                  `https://admin.appmax.com.br/api/v3/payment/pix`,
                  paymentForm,
                  { headers }
                )
                .then((response) => {
                  console.log(response.data, "DEU CERTO O PAGAMENTO ✅")
                  setDataFromApi(response.data)
                  navigate("/payment-pix", {
                    state: {
                      dataFromApi: response.data,
                      orderId,
                      dataExpiracaoJSON,
                    },
                  })
                })
                .catch((error) => {
                  console.error(error, "DEU ERRADO")
                  setShowLoading(false)
                })
            })
            .catch((error) => {
              console.error(error)
            })
        })
        .catch((error) => {
          console.error(error)
        })
      setErrorInputs("")
    } else {
      setErrorInputs("Por favor, preencha todos os campos")
    }
  }

  function handleSubmitBoleto() {
    const [firstName, ...lastName] = nomeCompleto.split(" ")

    const precoFinalBoleto = parseFloat((produto.preco * itemCount).toFixed(2))

    const postCustomer = {
      "access-token": accessToken,
      firstname: firstName,
      lastname: lastName.join(" "),
      document_number: cpf,
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
    }

    const headers = {
      "access-token": accessToken,
    }

    if ((nomeCompleto && email && telefone && cpf && cep && numero) != "") {
      axios
        .post("https://admin.appmax.com.br/api/v3/customer", postCustomer, {
          headers,
        })
        .then((response) => {
          console.log(response.data, "CLIENTE ✅")
          setShowLoading(true)

          const postOrder = {
            "access-token": accessToken,
            total: precoFinalBoleto,
            products: [
              {
                sku: produto.id,
                name: produto.nome,
                qty: itemCount,
              },
            ],
            customer_id: response.data.data.id,
          }
          axios
            .post("https://admin.appmax.com.br/api/v3/order", postOrder, {
              headers,
            })
            .then((response) => {
              console.log(response.data, "ORDEM ✅")

              const orderId = response.data.data.id

              const paymentForm = {
                "access-token": accessToken,
                cart: {
                  order_id: response.data.data.id,
                },
                customer: {
                  customer_id: response.data.data.customer_id,
                },
                payment: {
                  Boleto: {
                    document_number: cpf,
                  },
                },
              }
              axios
                .post(
                  `https://admin.appmax.com.br/api/v3/payment/boleto`,
                  paymentForm,
                  { headers }
                )
                .then((response) => {
                  console.log(response.data, "DEU CERTO O PAGAMENTO ✅")
                  setDataFromApi(response.data)
                  navigate("/payment-boleto", {
                    state: {
                      dataFromApi: response.data,
                      orderId,
                      precoFinalBoleto,
                    },
                  })
                })
                .catch((error) => {
                  console.error(error, "DEU ERRADO")
                  setShowLoading(false)
                })
            })
            .catch((error) => {
              console.error(error)
            })
        })
        .catch((error) => {
          console.error(error)
        })
      setErrorInputs("")
    } else {
      setErrorInputs("Por favor, preencha todos os campos")
    }
  }

  return (
    <Container>
      <GlobalStyle />

      {showLoading && <Loading />}

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
            <Cronometro minutos="10" segundos="8" />
          </CronometroStyle>
        </DivFlexHeader>
      </HeaderPromotion>

      <Content>
        <FormWrapper className="formulario">
          <ImageGarantiaCnt>
            <ImageGarantia
              src="https://assets.mycartpanda.com/static/theme_images/d0/0d/07/290462_0670611796.png"
              alt="Selo de Garantia"
            />
          </ImageGarantiaCnt>

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
                  <img src={produto.imagem} alt="Imagem do Produto" />
                  <div style={{ padding: "0 15px", width: "100%" }}>
                    {produto.nome}
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
                      R${" "}
                      {(itemCount * produto.preco).toString().replace(".", ",")}
                    </p>
                    <Quantidade>
                      <button
                        type="button"
                        onClick={() => {
                          handleSetItemCount(Math.max(itemCount - 1, 1))
                        }}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        name="quantity"
                        value={itemCount}
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={() => {
                          handleSetItemCount(itemCount + 1)
                        }}
                      >
                        +
                      </button>
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

                    {selectedPix && <p>Desconto PIX</p>}

                    <Total>Total</Total>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <p>
                      R${" "}
                      {(itemCount * produto.preco).toString().replace(".", ",")}
                    </p>
                    <p>---</p>
                    {selectedPix && (
                      <p>
                        - R${" "}
                        {(parseFloat(produto.descontoPix()) * itemCount)
                          .toFixed(2)
                          .replace(".", ",")}
                      </p>
                    )}

                    {selectedCard && <Total>{selectedOption}</Total>}

                    {selectedPix && (
                      <Total>
                        R${" "}
                        {(parseFloat(produto.precoPix()) * itemCount)
                          .toFixed(2)
                          .replace(".", ",")}
                      </Total>
                    )}

                    {selectedBoleto && (
                      <Total>
                        R${" "}
                        {(itemCount * produto.preco)
                          .toString()
                          .replace(".", ",")}
                      </Total>
                    )}

                    {selectedCard && (
                      <p style={{ fontSize: "0.625rem" }}>
                        OU R${" "}
                        {(itemCount * produto.preco)
                          .toString()
                          .replace(".", ",")}{" "}
                        À VISTA
                      </p>
                    )}
                  </div>
                </ResumoPedido>
              </AccordionItem>
            </Accordion>
          </SectionMobile>

          <TitleSection>Informações Pessoais</TitleSection>
          <Text>Para quem devemos entregar o pedido?</Text>
          <DivErrorInputs>
            <InputWrapper>
              <InputMask
                type="email"
                id="email"
                value={email}
                className={errorInputs && email === "" ? "error-border" : ""}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <p className="placeholder">E-mail*</p>
            </InputWrapper>
            <InputWrapper>
              <InputMask
                type="text"
                id="nomeCompleto"
                value={nomeCompleto}
                className={
                  errorInputs && nomeCompleto === "" ? "error-border" : ""
                }
                onChange={(event) => setNomeCompleto(event.target.value)}
                required
              />
              <p className="placeholder">Nome completo*</p>
            </InputWrapper>

            <DivFlex style={{ marginBottom: "36px" }}>
              <InputWrapper>
                <InputMask
                  type="tel"
                  id="telefone"
                  mask="(99) 99999-9999"
                  maskChar={null}
                  value={telefone}
                  className={
                    errorInputs && telefone === "" ? "error-border" : ""
                  }
                  onChange={(event) => setTelefone(event.target.value)}
                  required
                />
                <p className="placeholder">Celular*</p>
              </InputWrapper>

              <DivError>
                <InputWrapper>
                  <InputMask
                    type="text"
                    id="cpf"
                    className={
                      errorCPF
                        ? "error-border"
                        : "" || (errorInputs && cpf === "")
                        ? "error-border"
                        : ""
                    }
                    mask="999.999.999-99"
                    maskChar={null}
                    value={cpf}
                    onBlur={validateCPF}
                    onChange={(event) => setCpf(event.target.value)}
                    required
                  />
                  <p className="placeholder">CPF*</p>
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
                  className={
                    errorCEP
                      ? "error-border"
                      : "" || (errorInputs && cep === "")
                      ? "error-border"
                      : ""
                  }
                  value={cep}
                  onChange={handleCepChange}
                  required
                />
                <p className="placeholder">CEP*</p>
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
                      value={logradouro}
                      onChange={(event) => setLogradouro(event.target.value)}
                      required
                    />
                    <p className="placeholder">Endereço*</p>
                  </InputWrapper>

                  <InputWrapper>
                    <InputMask
                      type="text"
                      id="numero"
                      className={
                        errorInputs && numero === "" ? "error-border" : ""
                      }
                      value={numero}
                      onChange={(event) => setNumero(event.target.value)}
                      required
                    />
                    <p className="placeholder">Número*</p>
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
                      required
                    />
                    <p className="placeholder">Bairro*</p>
                  </InputWrapper>

                  <InputWrapper>
                    <InputMask
                      type="text"
                      id="complemento"
                      value={complemento}
                      onChange={(event) => setComplemento(event.target.value)}
                      required
                    />
                    <p className="placeholder">Complemento</p>
                  </InputWrapper>
                </DivFlex>
              </div>
            )}

            {errorInputs && (
              <PagamentoNegado style={{ maxWidth: "350px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{ width: "100%", maxWidth: "22px", height: "22px" }}
                  >
                    <AiFillAlert fill="#721C24" size="100%" />
                  </div>
                  <Text style={{ color: "#202223", marginBottom: "0" }}>
                    {errorInputs}
                  </Text>
                </div>
              </PagamentoNegado>
            )}

            <TitleSection style={{ marginTop: "36px" }}>
              Método de Pagamento
            </TitleSection>
            <Text>Escolha o seu método de pagamento abaixo</Text>

            {errorPagamento && (
              <Wrapper>
                <PagamentoNegado>
                  <div
                    style={{ display: "flex", gap: "5px", marginBottom: "8px" }}
                  >
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "22px",
                        height: "22px",
                      }}
                    >
                      <AiFillAlert fill="#721C24" size="100%" />
                    </div>
                    <TitleSection>{errorPagamento}</TitleSection>
                  </div>
                  <Text style={{ color: "#202223" }}>
                    Transação não autorizada. Revise os dados do seu cartão e
                    tente outra vez. Se persistir, tente outro cartão ou outra
                    forma de pagamento.
                  </Text>
                </PagamentoNegado>
              </Wrapper>
            )}

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
                  onClick={selectCardClick}
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
                          style={{ padding: "14px 20px 14px 45px" }}
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
                          style={{ padding: "14px 20px 14px 45px" }}
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
                  <Accordion>
                    <Parcelas>
                      <ControlledAccordion providerValue={providerValue}>
                        <AccordionItem
                          header={
                            <>
                              <h3>Parcelas</h3>
                              <p>{selectedOption}</p>
                            </>
                          }
                          itemKey="item-4"
                        >
                          <ul id="card-payment">
                            {options(itemCount).map((option) => (
                              <li
                                key={option.key}
                                onClick={() =>
                                  handleOptionClick(option.value, option.key)
                                }
                                className={
                                  selectedOption === option.key
                                    ? "selected"
                                    : ""
                                }
                              >
                                {option.value}
                              </li>
                            ))}
                          </ul>
                          <input
                            type="hidden"
                            id="selected"
                            value={selectedKey}
                          />
                        </AccordionItem>
                      </ControlledAccordion>
                    </Parcelas>
                  </Accordion>
                  <ButtonCnt>
                    <Button type="button" onClick={handleSubmitCredit}>
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
                    onClick={selectPixClick}
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
                          Valor à vista{" "}
                          <strong>
                            R${" "}
                            {(parseFloat(produto.precoPix()) * itemCount)
                              .toFixed(2)
                              .replace(".", ",")}
                          </strong>
                          ;
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
                      <Button type="button" onClick={handleSubmitPix}>
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
                          Protegemos seus dados de pagamento usando encriptação
                          de alto nível
                        </Text>
                      </DivProtecao>
                    </ButtonCnt>
                  </AccordionItem>
                </InputWrapper>

                <InputWrapper
                  className="formPayBoleto"
                  style={{ borderTop: "1px solid #d9d9d9" }}
                >
                  <AccordionItem
                    header={
                      <HeaderAccordion>
                        <HeaderAccordionLeft>
                          <Checkbox>
                            <section></section>
                          </Checkbox>
                          <p>Boleto</p>
                        </HeaderAccordionLeft>
                        <HeaderAccordionRight>
                          <img src={ImageBoleto} alt="Ícone do Boleto" />
                        </HeaderAccordionRight>
                      </HeaderAccordion>
                    }
                    onClick={selectBoletoClick}
                  >
                    <Text style={{ color: "#000", marginBottom: "20px" }}>
                      Clique em "Finalizar Compra" para gerar o seu boleto.
                    </Text>
                    <Text style={{ color: "#000", marginBottom: "20px" }}>
                      Informações sobre o pagamento via boleto:
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
                          Valor à vista{" "}
                          <strong>
                            R${" "}
                            {(itemCount * produto.preco)
                              .toString()
                              .replace(".", ",")}
                          </strong>
                          ;
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
                          Prazo de até 2 dias úteis para compensar.
                        </Text>
                      </li>
                    </ul>
                    <ButtonCnt>
                      <Button type="button" onClick={handleSubmitBoleto}>
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
                          Protegemos seus dados de pagamento usando encriptação
                          de alto nível
                        </Text>
                      </DivProtecao>
                    </ButtonCnt>
                  </AccordionItem>
                </InputWrapper>
              </Accordion>
            </AccordionWrapper>
          </DivErrorInputs>

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
          <div className="wrapper" style={{ width: "100%", maxWidth: "475px" }}>
            <div
              id="detalhesProduto"
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "15px",
              }}
            >
              <img src={produto.imagem} alt="Imagem do Produto" />
              <div style={{ padding: "0 15px", width: "100%" }}>
                {produto.nome}
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    letterSpacing: "0.4px",
                    color: "#202223",
                    marginTop: "3px",
                  }}
                >
                  R$ {(itemCount * produto.preco).toString().replace(".", ",")}
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
                  <button
                    type="button"
                    onClick={() => {
                      handleSetItemCount(Math.max(itemCount - 1, 1))
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="quantity"
                    value={itemCount}
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleSetItemCount(itemCount + 1)
                    }}
                  >
                    +
                  </button>
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

                {selectedPix && <p>Desconto Pix</p>}

                <Total>Total</Total>
              </div>
              <div style={{ textAlign: "end" }}>
                <p>
                  R$ {(itemCount * produto.preco).toString().replace(".", ",")}
                </p>
                <p>---</p>

                {selectedPix && (
                  <p>
                    - R${" "}
                    {(parseFloat(produto.descontoPix()) * itemCount)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                )}

                {selectedCard && <Total>{selectedOption}</Total>}

                {selectedPix && (
                  <Total>
                    R${" "}
                    {(parseFloat(produto.precoPix()) * itemCount)
                      .toFixed(2)
                      .replace(".", ",")}
                  </Total>
                )}

                {selectedBoleto && (
                  <Total>
                    R${" "}
                    {(itemCount * produto.preco).toString().replace(".", ",")}
                  </Total>
                )}

                {selectedCard && (
                  <p style={{ fontSize: "0.625rem", marginBottom: "0" }}>
                    OU R${" "}
                    {(itemCount * produto.preco).toString().replace(".", ",")} À
                    VISTA
                  </p>
                )}
              </div>
            </ResumoPedido>
          </div>
        </SectionDesktop>
      </Content>
    </Container>
  )
}

export default Checkout
