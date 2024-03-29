import { h } from 'preact';
import axios from 'axios';
import style from './style.css';
import { useState } from 'preact/hooks';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [botCheck, setBotCheck] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (toTest) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(toTest.toLowerCase());
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setError('');
    setResponse('');
    if (botCheck !== 'canada') {
      setError(
        'You did not pass the bot check test! Please select the country that holds a CDT terminus.'
      );
      return;
    } else if (!email || !validateEmail(email)) {
      setError(
        'Please enter a valid email address so I know where to send my reply!'
      );
      return;
    }
    axios({
      method: 'POST',
      url: `https://lit-shelf-99541.herokuapp.com/api/sendMessage`,
      data: {
        name,
        email,
        message,
      },
    }).then(
      (resp) => {
        setResponse(resp.data.message);
      },
      (error) => console.log(error)
    );
  };

  return (
    <div class={style.container}>
      <div class={style.headerBlock}>
        <h1>Contact</h1>
        <p>
          Please use the below form to submit comments, suggestions, and
          concerns.
        </p>
        <p>
          Please note that Zach is likely on trail, and responses may be
          delayed.
        </p>
      </div>
      {response && <div class={style.messageBlock}>{response}</div>}
      {error && <div class={style.errorBlock}>{error}</div>}
      <div class={style.formContainer}>
        <form name='contact' method='post'>
          <input type='hidden' name='form-name' value='contact' />
          <div>
            <label for='name'>Your Name:</label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label for='name'>Your Email:</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label for='name'>Your Message:</label>
            <textarea
              id='message'
              value={message}
              rows={5}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <label for='botcheck'>
              <strong>Bot Check: Select the CDT Terminus Country</strong>
            </label>
            <select
              value={botCheck}
              id='botcheck'
              class={style.botCheck}
              onChange={(e) => setBotCheck(e.target.value)}>
              <option value=''>Please Select</option>
              <option value='costarica'>Costa Rica</option>
              <option value='russia'>Russia</option>
              <option value='canada'>Canada</option>
              <option value='france'>France</option>
            </select>
          </div>
          <button type='submit'>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
