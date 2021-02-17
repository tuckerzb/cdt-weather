import { h } from 'preact';
import { Link } from 'preact-router';
import style from './style.css';

const About = () => (
	<div class={style.container}>
		<div class={style.headerBlock}>
			<h1>About</h1>
			<p>This project was inspired by <a href='https://www.atweather.org/'>ATWeather.org</a> - an incredible resource for the AT and PCT hiking communities developed by Pat Jones.</p>
			<p>CDT Weather is created and maintained by <a href='https://zachtucker.dev'>Zach "Free Fall" Tucker</a> (Tahoe Rim Trail 2019, AT NOBO 2020). Please use the <Link href='/contact'>Contact</Link> page for comments, suggestions, and concerns.</p>
		</div>
	</div>
);

export default About;
