import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

export default function Login(props) {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');
	const [error, setError] = useState(null);

	// Validating the entered login data.
	// If successful then navigating to emails page.
	const validate = (e) => {
		e.preventDefault();
		setEmail(email.trim());
		if (/^([a-zA-Z0-9._-]+)@([a-zA-Z0-9-]+)(\.[a-z]+)?(\.([a-z]+))$/.test(email)) {
			if (pwd !== '') {
				setError(null);
				let url = '/auth/login';
				let postData = {'email': email, 'pwd': pwd};
				let params = { 
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(postData)
				};
				fetch(url, params).then(response => response.json()).then(res => {
					if (res.isSuccess) {
						props.setAuthSuccess(true);
						props.setUserName(res.userName);
						props.setUserEmail(res.userEmail);
						navigate('/emails/inbox');
					}
					else if (res.error)
						setError(res.error);
				});
			}
			else
				setError('Please enter password.');
		}
		else
			setError('Invalid email address.');
	};

	return (
		<div className='login-container'>
			<h2>Login</h2>
			<div style={{display: error ? 'block' : 'none'}} className="error">{error}</div>
			<form onSubmit={validate}>
				<div className="form">
					<label htmlFor="email">Email:</label><br />
					<input type="email" onChange={e => setEmail(e.target.value)} id="email" name="email" placeholder="Email" /><br />
					<label htmlFor="pwd">Password:</label><br />
					<input type="password" onChange={e => setPwd(e.target.value)} id="pwd" name="pwd" placeholder="Password" /><br />
				</div>
				<button type="submit" className="login-btn">Login</button>
			</form>
		</div>
	);
}
