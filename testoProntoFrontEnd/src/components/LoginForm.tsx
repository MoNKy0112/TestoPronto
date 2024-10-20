import { useState } from "react";

interface loginFormProps {
	login: (email: string, password: string) => void;
	onCancel: () => void;
}

const LoginForm: React.FC<loginFormProps> = ({ login, onCancel }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		login(email, password);
		setEmail('');
		setPassword('');
		onCancel();
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Login</button>
				<button type="button" onClick={onCancel}>Cancel</button>
			</form>
		</div>
	);
};

export default LoginForm;