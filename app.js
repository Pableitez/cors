const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const BASE_URL = 'https://rickandmortyapi.com/api/character';

// Ruta para buscar por nombre
app.get('/characters', async (req, res) => {
    const { name } = req.query;

    try {
        const response = await axios.get(`${BASE_URL}/?name=${name}`);

        if (!response.data.results || response.data.results.length === 0) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }

        const character = response.data.results[0];
        const { name: charName, status, species, gender, origin, image } = character;

        res.json({
            name: charName,
            status,
            species,
            gender,
            origin: origin.name,
            image
        });

    } catch (error) {
        res.status(404).json({ error: 'Personaje no encontrado' });
    }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
