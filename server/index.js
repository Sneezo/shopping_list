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

app.get("/api/icons", (req, res) => {
    const iconsDirectory = path.join(__dirname, '../client/src/assets/icons');

    fs.readdir(iconsDirectory, (err, files) =>{
        if(err){
            return res.status(500).json({error:"failed to read icons"});
        }
        const iconFiles = files.filter(file => file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".webp"));

        res.json(iconFiles);
    });
});


db.connect(err=>{
    if(err) throw err;
    console.log("connected db");
});

app.get("/api/icons", (req, res) => {
    const iconsDirectory = path.join(__dirname, "../client/src/assets/icons/");

    fs.readdir(iconsDirectory, (err, files) =>{
        if(err){
            return res.status(500).json({error:"failed to read icons"});
        }
        //const iconFiles = files.filter(file => file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".webp"));

        res.json(files);
    });
});

app.post("/api/products", (req,res) => {
    const {name, icon} = req.body;

    if(!name || !icon) {
        return res.status(400).json({error: "name and icon required"});
    }

    const sql = "INSERT INTO products (name, icon) VALUES (?,?)";
    db.query(sql, [name, icon], (err, result) => {
        if(err){
            return res.status(500).json({error: "Failed to add"});
        }
        res.status(201).json({message: "product added", id: result.insertId});
    });
});

app.get("/api/users", (req,res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if(err) throw err;
        res.json(results);
    });
});

app.get("/api/products", (req,res) => {
    db.query("SELECT * FROM products", (err,results) => {
        if(err) {
            console.error("error fetching products", err);
            return res.status(500).json({error:"failed to fetch products"});
        }
        res.status(200).json(results);
    });
});

app.delete(`/api/products/:id`), async(req,res) => {
    const {id} = req.params;
    try {
        const result = await db.deleteProductById(id);
        if(result) {
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