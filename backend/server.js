import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors({
    origin: 'https://cdt-weather.vercel.app/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));
app.use(express.json());


    app.get('/', (req, res) => {
        res.send('API is running - CDT Weather - CORS enabled');
    });

    app.get('/getForecast', (req, res) => {
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
    console.log(`CORS-enabled Server listening on port ${PORT}`)
));