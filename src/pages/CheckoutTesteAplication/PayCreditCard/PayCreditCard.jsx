import React from "react"
import axios from "axios"
import { productsData } from "../CheckoutAplication/productsData"
import { BsCheckCircle } from "react-icons/bs"
import { useLocation } from "react-router-dom"
import {
  // ButtonAdicionar,
  Container,
  Content,
  DivCode,
  DivCronometro,
  DivIcon,
  DivPedido,
  DivQrcode,
  GlobalStyle,
  ImageLoja,
  Text,
  TextPedido,
  // Title,
  // Upsell,
  WrapperInformations,
} from "./styles"

function PayCreditCard() {
  const location = useLocation()
  const { orderId } = location.state

  return (
    <Container>
      <GlobalStyle />

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

      <Content>
        <WrapperInformations>
          <DivQrcode>
            <DivPedido>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <DivIcon>
                  <BsCheckCircle size="100%" fill="#202223" />
                </DivIcon>
                <h3>Pedido gerado com sucesso!</h3>
              </div>
            </DivPedido>

            <DivCronometro>
              <TextPedido style={{ textAlign: "center" }}>
                Seu pagamento foi computado.
                <br />
                Aguardando a confirmação da operadora de cartão de crédito.
              </TextPedido>
              <TextPedido style={{ textAlign: "center" }}>
                Você receberá mais informações no seu e-mail.
              </TextPedido>
            </DivCronometro>

            {/* Redenrização do número do pedido */}
            <DivCode>
              <Text style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                PEDIDO{" "}
                <span style={{ fontWeight: "600", color: "#40b76a" }}>
                  #{orderId}
                </span>
              </Text>
            </DivCode>
          </DivQrcode>
        </WrapperInformations>
      </Content>
    </Container>
  )
}

export default PayCreditCard
