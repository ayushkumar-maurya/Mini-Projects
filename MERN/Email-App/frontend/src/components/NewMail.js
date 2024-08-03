import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/NewMail.css';

export default function NewMail(props) {
	const navigate = useNavigate();
	const [to, setTo] = useState('');
	const [subject, setSubject] = useState('');
	const [msg, setMsg] = useState('');
	const [error, setError] = useState(null);

	// Checking if user have entered recipient's email address & subject.
	const check = (e) => {
		e.preventDefault();
		setTo(to.trim());
		setSubject(subject.trim());
		if (!/^([a-zA-Z0-9._-]+)@([a-zA-Z0-9-]+)(\.[a-z]+)?(\.([a-z]+))$/.test(to))
			setError("Please enter valid recipient's email address.");
		else if (subject === '')
			setError("Please enter the subject.");
		else {
			navigate('/emails/inbox');
			let url = '/email/send';
			let postData = {'to': to, 'subject': subject, 'msg': msg};
			let params = { 
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(postData)
			};
			fetch(url, params).then(response => response.json()).then(res => {
				if (res.isSent) {
					props.setInfo('Email sent successfully.');
					props.setInfoType('success');
				}
				else {
					props.setInfo('Failed to send email.');
					props.setInfoType('fail');
				}
			});
		}
	}

	return (
		<form onSubmit={check} className='new-mail'>
			<div style={{display: error ? 'block' : 'none'}} onClick={() => setError(null)} className='error-container'>
				<div className="error">{error}</div>
			</div>
			<input type="email" onChange={e => setTo(e.target.value)} name="to" placeholder="To" /><br />
			<input type="text" onChange={e => setSubject(e.target.value)} name="subject" placeholder="Subject" /><br />
			<textarea name="msg" onChange={e => setMsg(e.target.value)}></textarea>
			<button type="submit" className='send'>Send</button>
		</form>
	);
}
