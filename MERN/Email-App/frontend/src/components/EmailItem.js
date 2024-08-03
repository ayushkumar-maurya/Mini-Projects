import { useNavigate } from 'react-router-dom';
import '../css/EmailItem.css';

export default function EmailItem(props) {
	const navigate = useNavigate();
	const view = () => {
		props.setEmailId(props.email._id);
		navigate('/email/view');
	};	
	return (
		<div className="email-item" onClick={view}>
			<div className="add">{props.add === 'from' ? props.email.from : props.email.to}</div>
			<div className="subject">{props.email.subject}</div>
		</div>
	);
}
