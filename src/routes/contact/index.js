import { h } from 'preact';
import axios from 'axios';
import style from './style.css';
import {useState} from 'preact/hooks';


const Contact = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const sendMessage = () => {
		console.log(`Sending Message`);
		axios({
			method: 'POST',
			url: `http://localhost:5000/api/sendMessage`,
			data: {
				name,
				email,
				message
			}
		}).then(response => {
			console.log(response);
		}, error => console.log(error));
	}
	
	return (<div class={style.container}>
		<div class={style.headerBlock}>
			<h1>Contact</h1>
			<p>Please use the below form to submit comments, suggestions, and concerns.</p>
		</div>
		<div>
			<div>
				<label for='name'>Your Name:</label>
				<input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
			</div>
			<div>
				<label for='name'>Your Email:</label>
				<input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
			</div>
			<div>
				<label for='name'>Your Message:</label>
				<textarea id='message' value={message} onChange={(e) => setMessage(e.target.value)} />
			</div>
			<button onClick={sendMessage}>Send Message</button>
		</div>
	</div>);
};

export default Contact;
