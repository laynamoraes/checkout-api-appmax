import React from "react"
import ReactDOM from "react-dom/client"

// 1 - configurando router
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import PortaSapatos from "./pages/porta-sapatos/PortaSpatos"
import Home from "./pages/Home/Home"
import Checkout from "./pages/CheckoutTesteAplication/CheckoutAplication/Checkout"
import PayPix from "./pages/CheckoutTesteAplication/PayPix/PayPix"
import PayCreditCard from "./pages/CheckoutTesteAplication/PayCreditCard/PayCreditCard"
import PayBoleto from "./pages/CheckoutTesteAplication/PayBoleto/PayBoleto"
import PresellOne from "./pages/CheckoutTesteAplication/PayCreditCard/PresellOne"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "checkout/:id",
    element: <Checkout />,
  },
  {
    path: "porta-sapatos",
    element: <PortaSapatos />,
  },
  {
    path: "payment-pix",
    element: <PayPix />,
  },
  {
    path: "payment-credit-card",
    element: <PayCreditCard />,
  },
  {
    path: "presell-one/:id",
    element: <PresellOne />,
  },
  {
    path: "payment-boleto",
    element: <PayBoleto />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
)
