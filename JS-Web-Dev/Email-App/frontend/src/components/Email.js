import { Outlet } from 'react-router-dom';
import '../css/Email.css';
import Menu from './Menu';

export default function Email(props) {
	return !props.authSuccess ? <></> : (
		<div className='email-container'>
			<Menu />
			<div className='email'>
				<Outlet />
			</div>
		</div>
	);
}
