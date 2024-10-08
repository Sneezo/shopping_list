import React, { useState, useEffect } from 'react'
import styles from "./Products.module.css";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/api/products")
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(err => console.log(err));
      },[])

    const deleteProduct = async (id) => {
      try{
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {method: `DELETE`});
        if(response.ok) {
          setProducts(products.filter(product => product.id !== id));
        } else{
          console.error("Failed to delete product");
        }
      }
      catch(err){
        console.error("Error deleting product");
      }
    }

  return (
    products?
    <ul>
        {products.map(product => 
        <li key={product.id} className={styles.productItem}>
          <div className={styles.productContent}>
          <img className={styles.icon} src={`http://localhost:5000${product.image}`}></img>
          <span className={styles.productName}>{product.name}</span>
          <button className={styles.deleteButton}
          onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
          </li>)}
    </ul>
    : <h1>No products</h1>
  )
}

export default Products;