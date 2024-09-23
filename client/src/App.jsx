import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './assets/components/HomePage';
import AddProductPage from './assets/components/AddProductPage';
import Products from './assets/components/Products';
import Navbar from './assets/components/Navbar';
import TestPage from './assets/components/TestPage';

function App() {

  return(
    <>
    <Navbar/>
      <Routes>
        <Route  path="/" element={<HomePage/>}/>
        <Route path="/add-product" element={<AddProductPage/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/test" element={<TestPage/>}/>
      </Routes>
    </>
  )

}

export default App;
