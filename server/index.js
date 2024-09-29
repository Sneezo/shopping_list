const express = require("express");
const cors = require("cors");
const {Client} = require("pg");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT;
const db = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

app.use("/assets/icons", express.static(path.join(__dirname, "../client/src/assets/icons")));


db.connect(err=>{
    if(err) throw err;
    console.log("connected db");
});

app.get("/api/icons", (req, res) => {
    const iconsDirectory = path.join(__dirname, "../client/src/assets/icons");

    fs.readdir(iconsDirectory, (err, files) =>{
        if(err){
            return res.status(500).json({error:"failed to read icons"});
        }
        //const iconFiles = files.filter(file => file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".webp"));

        res.json(files);
    });
});

app.post("/api/products", async (req,res) => {
    const {name, image} = req.body;
    console.log(name, image);

    if(!name || !image) {
        return res.status(400).json({error: "name and image required"});
    }

    const sql = "INSERT INTO products (name, image) VALUES ($1,$2) RETURNING id";
    try{
        const result = await db.query(sql, [name,image]);
        res.status(201).json({message: "Product added", id:result.rows[0].id});
    } catch (err) {
        console.log("Failed to add product");
        res.status(500).json({error: "Failed to add product"});
    }
});

app.get("/api/cart", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM cart");
        res.status(200).json(result.rows);
    } catch {
        console.error("Error fetching cart", err);
        res.status(500).json({error: "Failed to fetch cart"})
    }
})

app.delete("/api/cart/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const result = await db.query("DELETE FROM cart WHERE id = $1 RETURNING *", [id]);
        if(result.rowCount === 0) {
            return res.status(404).json({error: "Product not found in cart"});
        }
        res.status(200).json({message: "Product removed from cart"});
    } catch(err) {
        console.error("error removing ", err);
        res.status(500).json({error: "Failed to remove product from cart"});
    }
})

app.patch("/api/cart", async (req, res) => {
    const { id, name, image, count } = req.body;
  
    if (!id || !name || !image || count === undefined) {
      return res.status(400).json({ error: "Product ID, name, image, and count are required" });
    }
  
    try {
      // Check if the product already exists in the cart
      const checkQuery = "SELECT * FROM cart WHERE id = $1";
      const checkResult = await db.query(checkQuery, [id]);
  
      if (checkResult.rows.length > 0) {
        // Product exists, update the count
        const updateQuery = "UPDATE cart SET count = $1 WHERE id = $2 RETURNING *";
        const updateResult = await db.query(updateQuery, [count, id]);
  
        return res.status(200).json({
          message: "Product quantity updated",
          product: updateResult.rows[0],
        });
      } else {
        // Product doesn't exist, insert it into the cart
        const insertQuery = "INSERT INTO cart (id, count) VALUES ($1, $2) RETURNING *";
        const insertResult = await db.query(insertQuery, [id, count]);
  
        return res.status(201).json({
          message: "Product added to cart",
          product: insertResult.rows[0],
        });
      }
    } catch (err) {
      console.error("Error updating cart", err);
      return res.status(500).json({ error: "Failed to update cart" });
    }
  });
  


app.get("/api/products", async (req,res) => {
    try{
        const result = await db.query("SELECT * FROM products");
        res.status(200).json(result.rows);
    } catch {
        console.error("Error fetching products", err);
        res.status(500).json({error: "Failed to fetch products"});
    }
});

app.delete(`/api/products/:id`, async (req,res) => {
    const {id} = req.params;
    try {
        const result = await db.query("DELETE FROM products WHERE id = $1",[id])
        if(result.rowCount > 0) {
            res.status(200).send({message: `Product deleted`});
        } else {
            res.status(404).send({message:`Product not found`});
        }

    }
    catch (err) {
        res.status(500).send({message:`Error deleting product`});
    }
});

app.listen(port, () => {
    console.log(`Server running @${port}`);
})