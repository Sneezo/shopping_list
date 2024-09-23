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
    const {name, icon} = req.body;

    if(!name || !icon) {
        return res.status(400).json({error: "name and icon required"});
    }

    const sql = "INSERT INTO products (name, icon) VALUES ($1,$2) RETURNING id";
    try{
        const result = await db.query(sql, [name,icon]);
        res.status(201).json({message: "Product added", id:result.rows[0].id});
    } catch (err) {
        console.log("Failed to add product");
        res.status(500).json({error: "Failed to add product"});
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

app.delete(`/api/products/:id`), async (req,res) => {
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
}

app.listen(port, () => {
    console.log(`Server running @${port}`);
})