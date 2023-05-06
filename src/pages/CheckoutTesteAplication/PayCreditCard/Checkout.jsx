import React, { useState, useRef } from "react"
import { GlobalStyle } from "../../../styles/global"
import { BsCheckCircle, BsPhone } from "react-icons/bs"
import { AiOutlineScan } from "react-icons/ai"
import { useLocation } from "react-router-dom"
import { addMinutes, parse } from "date-fns"
import {
  ButtonCopy,
  Container,
  CronometroStyle,
  DivCode,
  DivCopy,
  DivCronometro,
  DivIcon,
  DivPedido,
  DivQrcode,
  ImageLoja,
  Text,
  TextPedido,
  Title,
  WrapperInformations,
} from "./styles"

function PayCreditCard() {
  // const location = useLocation()
  // const { orderId } = location.state

  return (
    <Container>
      <GlobalStyle />

      <ImageLoja
        style={{ marginBottom: "20px" }}
        src="https://assets.mycartpanda.com/static/theme_images/d0/0d/07/290462_2797921766.png"
        alt="Logomarca da loja"
      />
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
            <TextPedido>
              Seu pagamento foi computado.
              <br />
              Aguardando a confirmação da operadora de cartão de crédito.
            </TextPedido>
            <TextPedido>
              Você receberá mais informações no seu e-mail.
            </TextPedido>
          </DivCronometro>

          <DivCode>
            <Text style={{ fontSize: "0.875rem", fontWeight: "500" }}>
              PEDIDO{" "}
              <span style={{ fontWeight: "600", color: "#40b76a" }}>
                {/* #{orderId} */}
              </span>
            </Text>
          </DivCode>
        </DivQrcode>
      </WrapperInformations>
    </Container>
  )
}

export default PayCreditCard
