import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Mail, Lock, Loader, ArrowLeft } from 'lucide-react';
import loginBg from '../assets/login_bg.png';
import useDocumentTitle from '../hooks/useDocumentTitle';

const LoginPage = () => {
    useDocumentTitle('Login');

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
        <div className="flex flex-col lg:flex-row bg-gray-50 relative">
            {/* Back Link - Top Left of Screen */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 xl:fixed">
                <Link to="/" className="inline-flex items-center text-sm text-white hover:text-gray-200 transition font-medium group bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-lg">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back
                </Link>
            </div>

            {/* Left Half - Image (Fixed/Sticky) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 lg:h-screen lg:sticky lg:top-0">
                <img
                    src={loginBg}
                    alt="Login Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Right Half - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center py-12 px-4 sm:p-8 md:p-12 lg:p-16 bg-white relative min-h-screen">
                <div className="w-full max-w-sm mx-auto animate-slide-up">
                    <div className="bg-white p-6 sm:p-8 md:px-8 md:pt-8 md:pb-6 w-full rounded-2xl transition-all duration-300">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/30 mb-6">
                                <Lock className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
                            <p className="text-gray-500 mt-2 text-sm">Sign in to manage your unified government approvals.</p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-center">
                                <div className="h-2 w-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all font-medium text-sm"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all font-medium text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm py-2">
                                <label className="flex items-center text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 bg-white focus:ring-blue-600/50 focus:ring-offset-white" />
                                    <span className="ml-2 font-medium">Remember me</span>
                                </label>
                                <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transform transition hover:-translate-y-0.5 mt-3 flex justify-center items-center shadow-lg shadow-blue-500/25
                                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? <Loader className="animate-spin h-5 w-5" /> : 'Log In to Dashboard'}
                            </button>
                        </form>

                        <p className="mt-4 text-center text-gray-600 text-sm font-medium">
                            New to GovSingleWindow?{' '}
                            <Link to="/register" className="text-gray-900 hover:text-blue-600 font-bold transition-colors underline decoration-gray-300 hover:decoration-blue-600/50 underline-offset-4">
                                Create an Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
