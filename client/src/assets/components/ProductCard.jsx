import React from 'react';
import styles from "./ProductCard.module.css";

const ProductCard = ({image, name}) => {
  return (
    <div className={styles.productcardgrid}>
        <img src={image} className={styles.icon}></img>
        <h2 className={styles.productcarditem}>{name}</h2>
    </div>
  )
}

export default ProductCard;