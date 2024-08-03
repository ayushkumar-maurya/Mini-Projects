import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';
import MenuItems from './MenuItems';

export default function Header(props) {
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);

	const logout = size => {
		size === 'large' ? setShowDropdownMenu(false) : setShowMenu(false);
		navigate('/logout');
	};

	return (
		<>
			<div className="header">
				<div className={'menu-icon ' + (props.authSuccess ? 'show-menu-icon' : 'hide-elem')}>
					<svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShowMenu(!showMenu)} fill="currentColor" viewBox="0 0 16 16">
						<path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
					</svg>
				</div>
				<div className="app-name"><Link to="/">Email App</Link></div>
				<div className="opts">
					<button type="button" onClick={() => navigate('/login')} className="login" style={{display: props.authSuccess ? 'none': 'inline'}}>Login</button>
					<button type="button" onClick={() => navigate('/create_user')} className={'create-ac ' + (props.authSuccess ? 'hide-elem' : 'show-create-ac')}>Create New Account</button>

					<svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShowDropdownMenu(!showDropdownMenu)} className={'dropdown-icon ' + (props.authSuccess ? 'show-dropdown-icon' : 'hide-elem')} fill="currentColor" viewBox="0 0 16 16">
						<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
					</svg>
					<div className="dropdown" style={{display: showDropdownMenu ? "block" : "none"}}>
						<div className="info">
							<p className='name'>{props.userName}</p>
							<p className="email">{props.userEmail}</p>
						</div>
						<hr />
						<button type="button" onClick={() => logout('large')} className="logout-lg">Logout</button>
					</div>
				</div>
			</div>
			<div className={showMenu ? "menu-sm show-menu-sm" : "menu-sm hide-menu-sm"}>
				<div className="info">
					<p className='name'>{props.userName}</p>
					<p className="email">{props.userEmail}</p>
				</div>
				<hr />
				<MenuItems size={showMenu ? 'small' : null} setShowMenu={setShowMenu} />
				<hr />
				<button type="button" onClick={() => logout('small')} className="logout-sm">Logout</button>
			</div>
		</>
	);
}
