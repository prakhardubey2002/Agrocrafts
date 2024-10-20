import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useLottie } from "lottie-react";

import Home from './pages/Home'
import Buyer from './pages/Buyer'
import Farmer from './pages/Farmer'
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buyer" element={<Buyer/>}/>
        <Route path="/farmer" element={<Farmer/>}/>
      </Routes>
    </>
  )
}

export default App