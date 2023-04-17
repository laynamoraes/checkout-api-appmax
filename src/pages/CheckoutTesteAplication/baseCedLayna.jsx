import React, { useState } from "react"
import axios from "axios"

function AddressForm() {
  const [cep, setCep] = useState("")
  const [logradouro, setLogradouro] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")

  const handleCepChange = async (event) => {
    const { value } = event.target
    setCep(value)

    if (value.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${value}/json/`
        )
        const { logradouro, bairro, localidade, uf } = response.data
        setLogradouro(logradouro)
        setBairro(bairro)
        setCidade(localidade)
        setEstado(uf)
      } catch (error) {
        console.error(error)
      }

    }
  }

  return (
    <div>
      <form>
        <h2>Informações de Entrega</h2>
        <p>Para onde devemos entregar o pedido?</p>
        <input
          type="number"
          id="cep"
          placeholder="CEP*"
          value={cep}
          onChange={handleCepChange}
        />

        {cep.length === 8 && (
          <div>
            <input
              type="text"
              id="logradouro"
              placeholder="Endereço*"
              value={logradouro}
              readOnly
            />

            <input type="text" id="numero" placeholder="Número*" />

            <span>
              {cidade}/{estado}
            </span>

            <br />

            <input
              type="text"
              id="bairro"
              placeholder="Bairro*"
              value={bairro}
              readOnly
            />

            <input type="text" id="complemento" placeholder="Complemento" />
          </div>
        )}
      </form>
    </div>
  )
}

export default AddressForm