import { useState, useEffect } from 'react';
import '../css/ViewMail.css';

export default function ViewMail(props) {
	const [email, setEmail] = useState({
		'subject': '',
		'from': '',
		'to': '',
		'message': ''
	});
	useEffect(() => {
		let url = '/email/retrieve/data';
		let postData = {'id': props.emailId};
		let params = { 
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData)
		};
		fetch(url, params).then(response => response.json()).then(res => setEmail(res));
	});
	return (
		<div className="view-mail">
			<h2 className="subject">{email.subject}</h2>
			<p className="from"><span>from:</span> {email.from}</p>
			<p className="to"><span>to:</span> {email.to}</p>
			<hr />
			<p className="msg">{email.message}</p>
		</div>
	);
}
