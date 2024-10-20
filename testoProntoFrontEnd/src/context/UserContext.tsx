import React, { createContext, useContext, useState, useEffect } from 'react';
import { user as UserType } from '../types/types';
import { getRequest } from '../api/api';

interface UserContextType {
	user: UserType | undefined;
	setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<UserType | undefined>(undefined);

	const getUser = async () => {
		try {
			const newDataUser = await getRequest('auth/profile');
			if (!newDataUser) {
				throw new Error('Error getting user');
			}
			setUser(newDataUser);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};