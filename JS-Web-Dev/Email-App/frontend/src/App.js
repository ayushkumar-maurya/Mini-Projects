import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import CreateNewAccount from './components/CreateNewAccount';
import Login from './components/Login';
import Logout from './components/Logout';
import Emails from './components/Emails';
import Inbox from './components/Inbox';
import Sent from './components/Sent';
import Outbox from './components/Outbox';
import Email from './components/Email';
import NewMail from './components/NewMail';
import ViewMail from './components/ViewMail';

function App() {
	const [authSuccess, setAuthSuccess] = useState(false);
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [emailId, setEmailId] = useState(null);
	const [info, setInfo] = useState(null);
	const [infoType, setInfoType] = useState(null);

	return (
		<Router>
			<Header authSuccess={authSuccess} userName={userName} userEmail={userEmail} />
			<Routes>
				<Route path='/' element={<Home authSuccess={authSuccess} />} />
				<Route path='/create_user' element={<CreateNewAccount setAuthSuccess={setAuthSuccess} setUserName={setUserName} setUserEmail={setUserEmail} />} />
				<Route path='/login' element={<Login setAuthSuccess={setAuthSuccess} setUserName={setUserName} setUserEmail={setUserEmail} />} />
				<Route path='/logout' element={<Logout setAuthSuccess={setAuthSuccess} />} />
				<Route path='/emails' element={<Emails authSuccess={authSuccess} info={info} infoType={infoType} setInfo={setInfo} />}>
					<Route path='inbox' element={<Inbox setEmailId={setEmailId} />} />
					<Route path='sent' element={<Sent setEmailId={setEmailId} />} />
					<Route path='outbox' element={<Outbox setEmailId={setEmailId} />} />
				</Route>
				<Route path='/email' element={<Email authSuccess={authSuccess} />}>
					<Route path='new' element={<NewMail setInfo={setInfo} setInfoType={setInfoType} />} />
					<Route path='view' element={<ViewMail emailId={emailId} />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
