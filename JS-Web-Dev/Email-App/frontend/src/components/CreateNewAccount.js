import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CreateNewAccount.css';

export default function CreateNewAccount(props) {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');
	const [cpwd, setCpwd] = useState('');
	const [error, setError] = useState(null);

	// Validating the entered data.
	// If account is created successfully then navigating to emails page.
	const validate = (e) => {
		e.preventDefault();
		setName(name.trim());
		setEmail(email.trim());

		if (name === '')
			setError('Please enter name.');
		else {
			if (!/^([a-zA-Z0-9._-]+)@([a-zA-Z0-9-]+)(\.[a-z]+)?(\.([a-z]+))$/.test(email))
				setError('Invalid email address.');
			else {
				if (pwd === '')
					setError('Please enter password.');
				else {
					if (pwd !== cpwd)
						setError('Passwords do not match.');
					else {
						setError(null);
						let url = '/auth/create_user';
						let postData = {'name': name, 'email': email, 'pwd': pwd, 'cpwd': cpwd};
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
							else if (res.doesUserExists === 1)
								setError('User with email ' + email + ' already exists.');
						});
					}
				}
			}
		}
	};

	return (
		<div className='create-ac-container'>
			<h2>Create New Account</h2>
			<div style={{display: error ? 'block' : 'none'}} className="error">{error}</div>
			<form onSubmit={validate}>
				<div className="form">
					<label htmlFor="name">Name:</label><br />
					<input type="text" onChange={e => setName(e.target.value)} id="name" name="name" placeholder="Name" /><br />
					<label htmlFor="email">Email:</label><br />
					<input type="email" onChange={e => setEmail(e.target.value)} id="email" name="email" placeholder="Email" /><br />
					<label htmlFor="pwd">Password:</label><br />
					<input type="password" onChange={e => setPwd(e.target.value)} id="pwd" name="pwd" placeholder="Password" /><br />
					<label htmlFor="cpwd">Confirm Password:</label><br />
					<input type="password" onChange={e => setCpwd(e.target.value)} id="cpwd" name="cpwd" placeholder="Confirm Password" /><br />
				</div>
				<button type="submit" className="create-ac-btn">Create</button>
			</form>
		</div>
	);
}
