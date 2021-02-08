import express from 'express';
import cors from 'cors';
import axios from 'axios';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));


    app.get('/api/', (req, res) => {
        res.send('API is running - CDT Weather - CORS enabled');
    });

    app.get('/api/getForecast', (req, res) => {
        axios({
            method: 'GET',
            url: `https://api.weather.gov/points/${req.query.lat},${req.query.long}`,
            headers: {
                'User-Agent': '(myweatherapp.com, contact@myweatherapp.com)',
                'Accept': 'application/geo+json'
            }
        }).then(response => {
            axios({
                method: 'GET',
                url: response.data.properties.forecast,
                headers: {
                    'User-Agent': '(myweatherapp.com, contact@myweatherapp.com)',
                    'Accept': 'application/geo+json'
                }
            }).then(response => {
                res.status(200).json(response.data.properties.periods);
            }, error => console.log(error));
        }, error => console.log(error));
    })


const PORT = 5000;

app.listen(PORT, () => (
    console.log(`Server listening on port ${PORT}`)
));