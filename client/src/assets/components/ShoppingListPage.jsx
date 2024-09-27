import React, { useState } from 'react'
import Products from './Products';
import useProducts from '../hooks/getProducts';
import ProductCard from './ProductCard';
import styles from "./ShoppingListPage.module.css";
import useCart from '../hooks/useCart';

const ShoppingListPage = () => {
  const {cart,setCart} = useCart();
  const {products, loading, error} = useProducts();

  function getProductById(id) {
    return products.find(product => product.id === id);
  }

  return (
    <div>
      <h1>
      Cart
      </h1>
      <ul>
      {cart.length > 0 ? (
  cart.map(item => {
    const product = getProductById(item.id);
    return product ? (
    <li className={styles.productItem} key={item.id}>
      <div className={styles.productContent}>
        <img className={styles.icon} src={`http://localhost:5000${product.image}`} alt={product.name} />
        <span className={styles.productName}>{product.name}</span>
        <button onClick={() => handleRemoveProduct(product.id)}>-</button>
      </div>
    </li>
    ) : null;
})
) : (
  <p>No products added</p>
)}

      </ul>
      <div className={styles.productGrid}>
        {products.map(product=>(
        <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default ShoppingListPage;