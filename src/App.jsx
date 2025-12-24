import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { Orders } from './pages/orders/Orders'
import { Tracking } from './pages/Tracking'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchAppData = async () => {
      const response = await axios.get('/api/cart-items?expand=product')
      setCart(response.data)

    }

    fetchAppData();

  }, [])

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<Orders cart={cart} />} />
      <Route path="tracking/:orderId/:productId" element={<Tracking cart={cart}/>} />
    </Routes>
  )
}

export default App
