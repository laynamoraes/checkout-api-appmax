import React, { useState, useEffect } from "react"
import InputMask from "react-input-mask"
import axios from "axios"

import { FormWrapper, InputWrapper, Label, Button } from "./styles"

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

  function handleSubmit() {
    formFirst()
  }

  return (
    <FormWrapper className="formulario" onSubmit={handleSubmit}>
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
          onChange={(event) => setCpf(event.target.value)}
          placeholder="CPF*"
        />
      </InputWrapper>
      <InputWrapper>
        <InputMask
          mask="99999-999"
          maskChar={null}
          id="cep"
          placeholder="CEP*"
          value={cep}
          onChange={handleCepChange}
        />
      </InputWrapper>

      {errorCEP && (
        <InputWrapper>
          <span>{errorCEP}</span>
        </InputWrapper>
      )}

      {showAddress && logradouro && bairro && cidade && estado && (
        <div>
          <InputWrapper>
            <span>
              {cidade}/{estado}
            </span>

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

          <InputWrapper>
            <InputMask type="text" id="complemento" placeholder="Complemento" />
          </InputWrapper>

          <InputWrapper>
            <InputMask
              type="text"
              id="bairro"
              placeholder="Bairro*"
              value={bairro}
              onChange={(event) => setBairro(event.target.value)}
            />
          </InputWrapper>
        </div>
      )}

      <Button onClick={formFirst}>Enviar</Button>
    </FormWrapper>
  )
}

export default Formulario
