import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';
import Orders from './pages/Orders';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import MobileMenu from './pages/mobile/MobileMenu';
import MobileCart from './pages/mobile/MobileCart';
import MobileCheckout from './pages/mobile/MobileCheckout';
import { OrderProvider } from './context/OrderContext';

function App() {
  const isMobile = window.innerWidth <= 768;

  return (
    <OrderProvider>
      {isMobile ? (
        <Routes>
          <Route path="/\" element={<MobileMenu />} />
          <Route path="/cart" element={<MobileCart />} />
          <Route path="/checkout" element={<MobileCheckout />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="tables" element={<Tables />} />
            <Route path="orders" element={<Orders />} />
            <Route path="menu" element={<Menu />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Routes>
      )}
    </OrderProvider>
  );
}

export default App;