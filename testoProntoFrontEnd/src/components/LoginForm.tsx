import '@assets/stylesheets/LoginForm.css';
import GoogleIcon from '@assets/icon/google.svg';
import { useState } from "react";

interface loginFormProps {
	login: (email: string, password: string) => void;
	onCancel: () => void;
}

const LoginForm: React.FC<loginFormProps> = ({ login, onCancel }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLoginWithGoogle = () => {
		window.location.href = 'http://localhost:3000/api/auth/google';
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		login(email, password);
		setEmail('');
		setPassword('');
		onCancel();
	};

	return (
		<div className="login-form-container add-overlay" >
			<div className='add-window'>
				<div className='login-header'>
					<h2>Login</h2>
					<button type='button' onClick={onCancel} className='exit-button'>X</button>
				</div>
				<form className="login-form" onSubmit={handleSubmit}>
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
					<button type="button" className="google-button" onClick={handleLoginWithGoogle}>
						<img src={GoogleIcon} className='icon' /> Login with Google
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;