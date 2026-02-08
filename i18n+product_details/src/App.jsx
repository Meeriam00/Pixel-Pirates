import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './layout/Header'
import Home from './pages/Home'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import Footer from './layout/Footer'

const App = () => {
  return (
   <>
   <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product' element={<Product />} />
      {/* Bura title gelecek */}
      <Route path='/product/:slug' element={<ProductDetail />}/>
    </Routes>
    <Footer />
   </BrowserRouter>
   </>
  )
}

export default App