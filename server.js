const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/restaurants/:postcode', async (req, res) => {
    const { postcode } = req.params;
    const url = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        res.send(data);
    } catch (error) {
        console.error('Error fetching Just Eat data:', error);
        res.status(500).send('Failed to fetch data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
