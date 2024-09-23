import React, { useEffect, useState } from "react";
import ImageDropDown from "./ImageDropDown";
import useIcons from "../hooks/getIcons";
import styles from "./AddProductPage.module.css";

function AddProductPage(){
    const [product, setProduct] = useState({name:"",image:""});
    const {icons,loading,error} = useIcons();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
        console.log(product)
    };

    const setIcon = (iconurl) => {
        setProduct({...product, image:iconurl})
        console.log(product)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            alert("product added");
            setProduct({name:"", image:""});
        } else {
            alert("error adding product");
        }
    };

    return(
        <div>
            <h1>Add New Product</h1>
            <form id="addproductform" onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={product.name} onChange={handleInputChange}/>
                </div>
                <div>
                    {product.icon? <label>Icon:<img className={styles.selectedIcon} src={`http://localhost:5000${product.icon}`}></img></label>:<label>Icon:</label>}
                    <ImageDropDown selectedIcon={product.icon} setIcon={setIcon} icons={icons}/>
                </div>
                <button type="submit">Add product</button>
            </form>
        </div>
    )
}

export default AddProductPage;