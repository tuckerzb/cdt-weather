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
			console.log(`${position.coords.latitude}`);
			console.log(`${position.coords.longitude}`);
			axios({
				method: 'GET',
				url: `https://cdt-weather-backend.herokuapp.com/api/getForecastFromLocation?lat=${position.coords.latitude}&long=${position.coords.longitude}`,
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
		setLat(Number(e.target.value.split(',')[3]));
		setLong(Number(e.target.value.split(',')[4]));
		axios({
			method: 'GET',
			url: `https://cdt-weather-backend.herokuapp.com/api/getForecastFromLandmark?id=${e.target.value}`,
		}).then(response => {
			setLoading(false);
			setForecastData(response.data);
		}, error => console.log(error));
	}

	useEffect(() => {

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
			<option value="EPZ,33,49,31.4977299,-108.2145227">Crazy Cook Monument (Terminus)</option>
			<option value="EPZ,19,88,32.3480219,-108.7078031">Lordsburg, NM</option>
			<option value="EPZ,37,106,32.778061,-108.274170">Silver City, NM</option>
			<option value="ABQ,25,65,33.742050,-108.477402">North End of Gila Alternate</option>
			<option value="ABQ,28,73,33.932659,-108.418900">Highway 12</option>
			<option value="ABQ,40,88,34.298328,-108.134720">Pie Town, NM</option>
			<option value="ABQ,54,125,35.155281,-107.842216">Grants, NM</option>
			<option value="ABQ,63,128,35.238819,-107.608459">Mt Taylor Summit</option>
			<option value="ABQ,90,160,36.014848,-106.963901">Cuba, NM</option>
			<option value="ABQ,99,168,36.203552,-106.719933">Highway 96</option>
			<option value="ABQ,103,173,36.329578,-106.624100">South End of Ghost Ranch Alternate</option>
			<option value="ABQ,108,176,36.401878,-106.494713">Highway 84</option>
			<option value="ABQ,119,189,36.709910,-106.230072">Highway 64</option>
			<option value="PUB,25,12,36.993870,-106.457108">NM/CO BORDER</option>
			<option value="co">-- Colorado --</option>


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
