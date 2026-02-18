import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Mail, Lock, Loader, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        const res = await login(email, password);
        setIsSubmitting(false);
        if (res.success) {
            navigate('/dashboard');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side - Illustration */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 relative">
                <Link to="/" className="absolute top-8 left-8 inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition z-20">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>

                <div className="max-w-md w-full">
                    <img
                        src="/src/assets/login_bg.png"
                        alt="Login Illustration"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full md:w-1/2 bg-[#0070f3] flex items-center justify-center p-8 relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 rounded-full border border-white/20"></div>
                <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 rounded-full border border-white/10"></div>

                <div className="bg-white rounded-[2rem] p-10 w-full max-w-md shadow-2xl relative z-10">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
                    </div>

                    {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm border border-red-200">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#0070f3] text-white py-3 rounded-full font-semibold shadow-lg hover:bg-blue-600 transform transition hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center mt-6"
                        >
                            {isSubmitting ? <Loader className="animate-spin h-5 w-5" /> : 'Login'}
                        </button>
                    </form>

                    <div className="mt-6 text-center space-y-4">
                        <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition block">Forgot Password?</a>
                        <p className="text-sm text-gray-600">
                            Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">Create Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
