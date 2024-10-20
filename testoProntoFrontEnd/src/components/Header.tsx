import '@assets/stylesheets/Header.css';

import Profile from '@assets/icon/profile.svg';

import React, { useState } from 'react';
import { postRequest } from '../api/api';
import LoginForm from '@components/LoginForm';
import { useUser } from '../context/UserContext';

const HeaderPage: React.FC = () => {

	const { user, setUser } = useUser();
	const [isLogging, setIsLogging] = useState(false);
	//TODO implement interface to user settings or profile
	// const changePicture = async (newPicture: string | undefined) => {
	// 	try {
	// 		setUser({ ...user, picrute: newPicture })
	// 	} catch (error) {
	// 		console.error(error)
	// 		return;
	// 	}
	// }

	const handleLogin = async (email: string, password: string) => {
		try {
			const newUser = await postRequest('auth/login', { email: email, password: password });
			if (!newUser) {
				console.error('Error logging in:', email, password);
				return;
			}
			console.log("newUser: ", newUser)
			setUser(newUser);
		} catch (error) {
			console.error(error)
			return;
		}
	}

	const handleCancelLogin = () => {
		setIsLogging(false);
	}

	return (
		<div className="header-container">
			<header className="header-content">
				<img src={user?.picrute || Profile} />
				<div>{user?.username || 'invitado'}</div>
				<div className="header-buttons">
					{!user ? (
						<button onClick={() => setIsLogging(true)}>Login</button>
					) : (
						<button onClick={() => setUser(undefined)}>Logout</button>
					)}
				</div>
			</header>
			{isLogging && <LoginForm login={handleLogin} onCancel={handleCancelLogin} />}
		</div>
	)
};

export default HeaderPage;