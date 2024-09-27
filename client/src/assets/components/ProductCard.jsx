import React from 'react';
import styles from "./ProductCard.module.css";

const ProductCard = ({product}) => {
  return (
    <div className={styles.productcardgrid}>
        <img src={`http://localhost:5000${product.image}`} className={styles.icon}></img>
        <h2 className={styles.productcarditem}>{product.name}</h2>
    </div>
  )
}

export default ProductCard;