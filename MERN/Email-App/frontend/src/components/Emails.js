import { useNavigate, Outlet } from 'react-router-dom';
import '../css/Emails.css';
import Menu from './Menu';

export default function Emails(props) {
	const navigate = useNavigate();
	return !props.authSuccess ? <></> : (
		<div className='emails-container'>
			<div style={{display: props.info ? 'block' : 'none'}} onClick={() => props.setInfo(null)} className='info-container'>
				<div className={props.infoType === 'success' ? 'info-success' : 'info-fail'}>{props.info}</div>
			</div>
			<Menu />
			<div className='emails'>
				<Outlet />
			</div>
			<button type="button" onClick={() => navigate('/email/new')} className='compose'>Compose</button>
		</div>
	);
}
