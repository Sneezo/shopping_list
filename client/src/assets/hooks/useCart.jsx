import React, { useState, useEffect } from 'react'

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cart");
        if(!response.ok){
          throw new Error(`http error! ${response.status}`);
        }
        const data = await response.json();
        setCart(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  },[]);

  return {cart,setCart,loading,error};
}

export default useCart;