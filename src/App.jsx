import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useLottie } from 'lottie-react'

import Home from './pages/Home'
import Buyer from './pages/Buyer'
import Farmer from './pages/Farmer'
import FarmerDashboard from './pages/FarmerDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import { AuthProvider } from './context/context'
import Cart from './components/Cart'


function App() {
  return (
    <>
      
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buyer" element={<Buyer />} />
            <Route path="/farmer" element={<Farmer />} />
            <Route path="/farmerdashboard" element={<FarmerDashboard />} />
            <Route path="/buyerdashboard" element={<BuyerDashboard />} />
            <Route path="/cart" element={<Cart />} /> {/* Cart route */}
          </Routes>
        </AuthProvider>
    
    </>
  )
}

export default App
