require('dotenv').config(); // Això carrega les variables del fitxer .env
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

// Ara fem servir process.env per accedir a les dades
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get('/numPokemons', (req, res) => {
    const sql = "SELECT count(*) as total FROM pokemon p;";

    db.query(sql, (err, resultats) => {
        if (err) return res.status(500).send("Error a la base de dades");
        //console.log(resultats)
        res.json(resultats);
    });
});



app.get('/pokemons', (req, res) => {
    // Demanem només les dues columnes que ens interessen
    const sql = "SELECT * FROM pokemon";

    db.query(sql, (err, resultats) => {
        if (err) return res.status(500).send("Error a la base de dades");
        res.json(resultats); // Envia l'array de concerts tal qual
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corrent al port ${PORT}`);
});