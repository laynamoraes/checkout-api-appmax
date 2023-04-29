import React from "react"
import ReactDOM from "react-dom/client"

// 1 - configurando router
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// import SofaCamaDobravel from "./pages/sofa-cama-dobravel/SofaCama"
// import DispensaPortatil from "./pages/dispensa-portatil/DispensaPortatil"
// import PistolaVap from "./pages/pistola-alta-pressao/PistolaVap"
// import ConjuntoToalhas from "./pages/conjunto-toalhas/ConjuntoToalhas"
import PortaSapatos from "./pages/porta-sapatos/PortaSpatos"
import Home from "./pages/Home/Home"
// import DuvidaseRastreio from "./pages/DuvidaseRastreio/DuvidaseRastreio"
import Checkout from "./pages/Checkout/Checkout"
import CheckoutTeste from "./pages/CheckoutTesteAplication/CheckoutTeste"
// import AddressForm from "./pages/CheckoutTesteAplication/baseCedLayna"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "checkout-payment",
    element: <Checkout />,
  },
  {
    path: "checkout-teste/:id",
    element: <CheckoutTeste />,
  },
  {
    path: "porta-sapatos",
    element: <PortaSapatos />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
)
