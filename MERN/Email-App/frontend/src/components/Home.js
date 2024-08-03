import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

export default function Home(props) {
	const navigate = useNavigate();
	return (
		<div className='home'>
			<img src='/logo/logo.jpg' className="logo" alt="Email App" />
			<p className='info'>A MERN Stack based Email application</p>
			<button type="button" onClick={() => navigate('/create_user')} className={'create-ac ' + (props.authSuccess ? 'hide-elem' : 'show-create-ac')}>Create New Account</button>
		</div>
	);
}
