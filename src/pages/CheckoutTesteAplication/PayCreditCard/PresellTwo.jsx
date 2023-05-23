import React, { useState } from "react"
import axios from "axios"
import { productsData } from "../CheckoutAplication/productsData"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Loading from "../Loading/loading"

import {
  ButtonAdicionar,
  ButtonSeguir,
  Container,
  DivImage,
  GlobalStyle,
  ImageLoja,
  Text,
  Title,
  Upsell,
} from "./styles"

function PresellTwo() {
  const [showLoading, setShowLoading] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()
  const produto = productsData.find((p) => p.id == id)
  const location = useLocation()
  const { orderId, accessToken, dataFromApi } = location.state

  const upsellHash = dataFromApi.data.upsell_hash

  console.log(upsellHash)
  console.log(orderId)

  function handleSubmitUpsell() {
    const postUpsell = {
      "access-token": accessToken,
      hash: upsellHash,
      products: [
        {
          sku: produto.presellTwo.id,
          name: produto.presellTwo.nome,
          qty: 1,
          price: produto.presellTwo.preco,
        },
      ],
      overwrite_cart: false,
    }

    const headers = {
      "access-token": accessToken,
    }

    axios
      .post(`https://admin.appmax.com.br/api/v3/order/upsell`, postUpsell, {
        headers,
      })
      .then((response) => {
        setShowLoading(true)

        console.log(response.data, "DEU CERTO O UPSELL 2 ✅")

        navigate(`/payment-credit-card`, {
          state: {
            orderId,
          },
        })
      })
      .catch((error) => {
        setShowLoading(false)
        console.error(error, "DEU ERRADO")
      })
  }

  function handleButtonSeguir() {
    setShowLoading(true)

    setTimeout(() => {
      navigate(`/payment-credit-card`, {
        state: {
          dataFromApi,
          orderId,
          accessToken,
        },
      })
    }, 2000)
  }

  return (
    <Container>
      <GlobalStyle />

      {showLoading && <Loading />}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ImageLoja
          style={{ marginBottom: "20px" }}
          src="https://assets.mycartpanda.com/static/theme_images/d0/0d/07/290462_2797921766.png"
          alt="Logomarca da loja"
        />
      </div>

      <Upsell>
        <Title>Adicione uma OFERTA ESPECIAL ao seu pedido</Title>
        <div style={{ display: "flex", gap: "1rem" }}>
          <DivImage>
            <img src={produto.presellTwo.imagem} alt="Imagem do produto" />
          </DivImage>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text>{produto.presellTwo.nome}</Text>
            <Text style={{ fontWeight: "600" }}>
              R$ {produto.presellTwo.preco.toString().replace(".", ",")}
            </Text>
            <ButtonAdicionar type="button" onClick={handleSubmitUpsell}>
              Adicionar ao pedido
            </ButtonAdicionar>

            <ButtonSeguir type="button" onClick={handleButtonSeguir}>
              Seguir sem adicionar
            </ButtonSeguir>
          </div>
        </div>
      </Upsell>
    </Container>
  )
}

export default PresellTwo
