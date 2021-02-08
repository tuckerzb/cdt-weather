import { h } from 'preact';
import style from './style.css';
import axios from 'axios';
import {useState, useEffect} from 'preact/hooks';

const Loader = () => (
	<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
     width="60px" height="60px" style="display: block;" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;">
  <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 25 25"
      to="360 25 25"
      dur="0.6s"
      repeatCount="indefinite"/>
    </path>
  </svg>
);

const Home = () => {
	const [lat, setLat] = useState(0.0);
	const [long, setLong] = useState(0.0);
	const [forecastData, setForecastData] = useState([]);
	const [selectValue, setSelectValue] = useState('');
	const [loading, setLoading] = useState(false);

	const getLocationHandler = () => {
		setSelectValue('');
		setForecastData([]);
		setLoading(true);
		navigator.geolocation.getCurrentPosition(position => {
			setLat(position.coords.latitude);
			setLong(position.coords.longitude);
			axios({
				method: 'GET',
				url: `https://cdt-weather-backend.herokuapp.com/api/getForecast?lat=${position.coords.latitude}&long=${position.coords.longitude}`,
				// headers: {
				// 	'User-Agent': '(myweatherapp.com, contact@myweatherapp.com)',
				// 	'Accepts': 'application/geo+json'
				// }
			}).then(response => {
				setLoading(false);
				setForecastData(response.data);
			}, error => console.log(error));
		}, error => console.log(error));
	}

	const getForecastFromLandmark = (e) => {
		setLoading(true);
		setForecastData([]);
		setSelectValue(e.target.value);
		setLat(Number(e.target.value.split(',')[0]));
		setLong(Number(e.target.value.split(',')[1]));
		axios({
			method: 'GET',
			url: `https://cdt-weather-backend.herokuapp.com/api/getForecast?lat=${Number(e.target.value.split(',')[0])}&long=${Number(e.target.value.split(',')[1])}`,
			// headers: {
			// 	'User-Agent': '(myweatherapp.com, contact@myweatherapp.com)',
			// 	'Accepts': 'application/geo+json'
			// } 
		}).then(response => {
			setLoading(false);
			setForecastData(response.data);
		}, error => console.log(error));
	}

	useEffect(() => {
		// console.log(`Latitude: ${lat}`);
		// console.log(`Longitude: ${long}`);
		// if (forecastURL && forecastData.length === 0) {
		// 	getForecast();
		// }
	}, [forecastData]);
	
	return (<div class={style.container}>
		<div class={style.headerBlock}>
		<h1>Welcome to CDT Weather</h1>
		<p>The <a href='https://continentaldividetrail.org/'>Continental Divide National Scenic Trail</a> is a 2,700+ mile path through the Rocky Mountains and along the Continental Divide. </p>
		<p>To get the 7-day National Weather Service forecast, click "Get My Location" or select the closest landmark to you from the dropdown.</p>
		</div>
		<button class={style.locationButton} onClick={getLocationHandler}>Get My Location</button> <strong>OR</strong>{' '}
		<select value={selectValue} name='landmark' id='landmark' onChange={getForecastFromLandmark}>
			<option value="">-- Select a Landmark --</option>
			<option value="nm">-- New Mexico --</option>
			<option value="31.497049,-108.208488">Crazy Cook Monument (Terminus)</option>
			<option value="32.346939,-108.707222">Lordsburg, NM</option>
		</select>
		{loading && (<><br /><Loader /></>)}
		<div class={style.forecastBlock}>
		{forecastData.length !== 0 && (<div class={style.forecastFor}><strong>Forecast For:</strong> {lat.toFixed(4)}{', '}{long.toFixed(4)} | <a target="_blank" rel="noopener" href={`https://www.google.com/maps/@${lat},${long},15z`}>View Location on Map</a></div>)}
		{forecastData && forecastData.map(item => (
			<div class={style.forecastItem}>
			{item.name}
			  	<p>{item.detailedForecast}</p>
			</div>
		))}
		</div>
	</div>);
};

export default Home;
