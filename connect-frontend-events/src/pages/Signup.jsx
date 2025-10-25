import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
const SignUpImg = '/images/SignUp.png';

const Logo = ({ src, alt = 'Company Logo', className = 'h-16 w-auto' }) => (
	<img src={SignUpImg} alt={alt} className={`inline-block ${className}`} />
);

function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [role, setRole] = useState('mentee');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		if (password.length < 6) {
			setError('Password should be at least 6 characters long.');
			setIsLoading(false);
			return;
		}

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const firebaseUser = userCredential.user;

			const payload = {
				email: firebaseUser.email,
				full_name: `${firstName} ${lastName}`.trim(),
				firebase_uid: firebaseUser.uid,
				role: role,
			};

			const created = await api.post('/api/users', { body: payload });
			if (!created) throw new Error('Failed to create user profile in database.');

			navigate('/');
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				setError('This email address is already registered. Please login.');
			} else if (err.code === 'auth/weak-password') {
				setError('Password is too weak. Please use a stronger password.');
			} else {
				setError(err.message || 'An unexpected error occurred during signup.');
			}
			setIsLoading(false);
		}
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
			<div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #f8f8f8, #e0e0e0)' }} />

			<div className="relative z-10 w-full max-w-lg">
				<div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg space-y-6">
					<h2 className="text-center text-3xl font-bold text-gray-900 mb-6">Sign up</h2>

					{error && (
						<div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
					)}

					<form onSubmit={handleSignup} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="firstName" className="sr-only">First Name</label>
								<input id="firstName" name="firstName" type="text" autoComplete="given-name" required
									className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition duration-150"
									placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={isLoading} />
							</div>
							<div>
								<label htmlFor="lastName" className="sr-only">Last Name</label>
								<input id="lastName" name="lastName" type="text" autoComplete="family-name" required
									className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition duration-150"
									placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={isLoading} />
							</div>
						</div>

						<div>
							<label htmlFor="email" className="sr-only">Email address</label>
							<input id="email" name="email" type="email" autoComplete="email" required
								className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition duration-150"
								placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
						</div>

						<div>
							<label htmlFor="password" className="sr-only">Password</label>
							<input id="password" name="password" type="password" autoComplete="new-password" required
								className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition duration-150"
								placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
						</div>

						<div>
							<label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
							<select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} disabled={isLoading}
								className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition duration-150">
								<option value="mentee">Mentee</option>
								<option value="mentor">Mentor</option>
							</select>
						</div>

						<div>
							<button type="submit" disabled={isLoading}
								className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">
								{isLoading ? 'Registering...' : 'Register'}
							</button>
						</div>
					</form>

					<p className="mt-6 text-center text-sm text-gray-600">Already a member?{' '}
						<Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">Log In</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
