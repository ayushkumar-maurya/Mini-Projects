import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout(props) {
	const navigate = useNavigate();
	useEffect(() => {
		fetch('/auth/logout').then(response => response.json()).then(res => {
			if (res.isSuccess) {
				props.setAuthSuccess(false);
				navigate('/');
			}
		});
	});
	return <></>;
}
