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

  const handleAddProduct = async (product) => {
    //TODO IMPLEMENT
    const existingItem = cart.find(item => item.id === product.id);
    const newEntry = existingItem 
    ? {...product,id: parseInt(product.id), count: parseInt(product.count)+1 }
    : {...product, count:1};

    const response = await fetch("http://localhost:5000/api/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry)
    });
    if (response.ok) {
      if(existingItem){
        setCart(
          cart.map(item => 
            item.id === product.id ? {...item, count: parseInt(item.count)+1} : item
          )
        );
      } else {
        setCart([...cart, newEntry]);
      }
  } else {
      alert("error adding product");
    }
  }

  const handleRemoveProduct = async (product) => {
    //TODO IMPLEMENT
    const existingItem = cart.find(item => item.id === product.id);
    if(!existingItem) return;

    const newCount = parseInt(existingItem.count) - 1;
    if(newCount < 1) {
      const response = await fetch(`http://localhost:5000/api/cart/${product.id}`,{
        method: "DELETE",
      });
      if(response.ok) {
        setCart(cart.filter(item => item.id !== product.id));
      } else {
        alert("Error removing product");
      }
    } else {
      const newEntry = {...product, id: product.id, count: newCount};
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });
      if(response.ok){
        setCart(cart.map(item => item.id === product.id ? {...item, count: newCount} : item));
      } else {
        alert("Error updating product");
      }
    }


  }

  return (
    <div>
      <h1>
      Cart
      </h1>
      <ul>
      {cart.length > 0 ? (
  cart.map(item => {
    const product = {...getProductById(item.id),count:item.count};
    return product ? (
    <li className={styles.productItem} key={item.id}>
      <div className={styles.productContent}>
        <span className={styles.itemCount}>{product.count}x</span>
        <img className={styles.icon} src={`http://localhost:5000${product.image}`} alt={product.name} />
        <span className={styles.productName}>{product.name}</span>
        <button className={styles.removeButton} onClick={() => handleRemoveProduct(product)}>-</button>
        <button className={styles.addButton} onClick={() => handleAddProduct(product)}>+</button>
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
        <ProductCard key={product.id} product={product} onClick={() => handleAddProduct(product)}/>
        ))}
      </div>
    </div>
  )
}

export default ShoppingListPage;