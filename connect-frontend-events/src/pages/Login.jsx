import { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import theme from '../styles/theme';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const ORANGE = theme.ORANGE;
  const MILKY = theme.MILKY;

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const bgPattern = `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'>
      <rect width='240' height='240' fill='${MILKY}' />
      <g fill='none' stroke='%23ED3F27' stroke-opacity='0.08' stroke-width='2'>
        <rect x='20' y='20' width='60' height='40' rx='4' />
        <rect x='140' y='120' width='60' height='40' rx='4' />
        <path d='M60 180 L90 140 L120 180 Z' />
      </g>
    </svg>
  `)}`;

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: MILKY, backgroundImage: `url(${bgPattern})` }}>
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-lg overflow-hidden shadow-lg">
        {/* Left illustration / branding with educational icons */}
        <div className="hidden md:flex flex-col items-center justify-center p-8">
          <div className="mb-6 flex items-center gap-4">
            <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="8" fill="white" opacity="0.9" />
              <g transform="translate(6,10)" fill="none" stroke={ORANGE} strokeWidth="2">
                <path d="M10 2 L28 2 L28 18 L10 18 Z" />
                <path d="M6 22 L32 22" />
              </g>
            </svg>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: ORANGE }}>Connect</h3>
              <p className="text-sm text-gray-700">Mentorship • Events • Community</p>
            </div>
          </div>
          <div className="text-gray-700 text-center max-w-xs">Explore curated workshops, find mentors and collaborate on projects. Educational resources and events at your fingertips.</div>
        </div>

        {/* Right: form */}
        <div className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-4" style={{ color: ORANGE }}>Sign in to Connect</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="********"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold">Login</button>
            </div>
          </form>

          <div className="my-4 flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="text-sm text-gray-500">or</div>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div>
            <button onClick={handleGoogleLogin} className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M17.64 9.2045c0-.638-.0573-1.251-.1636-1.84H9v3.48h4.8446c-.2096 1.14-.8454 2.1082-1.8055 2.7578v2.293h2.9165c1.7083-1.573 2.6999-3.892 2.6999-6.6918z" fill="#4285F4"/><path d="M9 18c2.43 0 4.4727-.8041 5.9636-2.1822l-2.9165-2.293c-.8091.5439-1.8464.8662-3.0471.8662-2.343 0-4.3282-1.5832-5.0385-3.7078H1.0062v2.3276C2.4993 15.9138 5.5486 18 9 18z" fill="#34A853"/><path d="M3.9615 10.6838c-.1836-.548-.2874-1.1323-.2874-1.7338 0-.6014.1038-1.1858.2874-1.7338V4.8886H1.0062A8.9999 8.9999 0 000 9c0 1.4776.3543 2.8738.9798 4.1112l2.9817-2.4274z" fill="#FBBC05"/><path d="M9 3.5795c1.3216 0 2.5066.4547 3.4381 1.3494l2.5786-2.5786C13.4687.7774 11.4283 0 9 0 5.5486 0 2.4993 2.0862 1.0062 4.8886l2.9553 2.6909C4.6718 5.1624 6.657 3.5795 9 3.5795z" fill="#EA4335"/></svg>
              <span className="text-sm">Sign in with Google</span>
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="text-orange-500 font-semibold">Sign up</Link>
          </div>

          {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;
