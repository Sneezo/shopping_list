import React, { useState, useEffect } from 'react'

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if(!response.ok){
          throw new Error(`http error! ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  },[]);

  return {products,loading,error};
}

export default useProducts;