import React, { useEffect, useState } from "react";

function AddProductPage(){
    const [product, setProduct] = useState({name:"",icon:""});
    const [icons, setIcons] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/api/icons")
        .then((response) => response.json())
        .then((data)=> setIcons(data))
        .catch((err)=>console.log("error fetching icons", err));
    }, [])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

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
            setProduct({name:"", icon:""});
        } else {
            alert("error adding product");
        }
    };

    return(
        <div>
            <h1>Add New Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={product.name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Icon:</label>
                    <select name="icon" value={product.icon} onChange={handleInputChange}>
                        <option value="">Select icon</option>
                        {icons.map((icon) => (
                            <option key={icon} value={`/assets/icons/${icon}`}>
                                {icon.replace(".webp","")}
                            </option>
                        ))}
                    </select>
                    {/*<input type="text" name="icon" value={product.icon} onChange={handleInputChange}/>*/}
                </div>
                <button type="submit">Add product</button>
            </form>
        </div>
    )
}

export default AddProductPage;