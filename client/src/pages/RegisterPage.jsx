import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { User, Mail, Lock, Phone, Briefcase, Loader, Building, ArrowLeft } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        role: 'entrepreneur',
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        const res = await register(
            formData.name,
            formData.email,
            formData.password,
            formData.mobile,
            formData.role
        );
        setIsSubmitting(false);
        if (res.success) {
            navigate('/profile');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side - Register Form */}
            <div className="w-full md:w-1/2 bg-[#0070f3] flex items-center justify-center p-8 relative overflow-hidden min-h-screen">
                {/* Back to Login Link */}
                <Link to="/login" className="absolute top-8 left-8 inline-flex items-center text-sm text-white hover:text-blue-100 transition z-20">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                </Link>

                {/* Decorative Circles */}
                <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 rounded-full border border-white/20"></div>
                <div className="absolute bottom-[-120px] left-[-120px] w-96 h-96 rounded-full border border-white/10"></div>

                <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl relative z-10 my-8">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
                    </div>

                    {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm border border-red-200">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="relative">
                            <User className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                name="mobile"
                                required
                                className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Mobile Number"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">I am a...</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button type="button"
                                    onClick={() => setFormData({ ...formData, role: 'entrepreneur' })}
                                    className={`p-2.5 border rounded-xl flex flex-col items-center justify-center text-sm transition-all ${formData.role === 'entrepreneur' ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Briefcase className="h-5 w-5 mb-1" />
                                    Entrepreneur
                                </button>
                                <button type="button"
                                    onClick={() => setFormData({ ...formData, role: 'officer' })}
                                    className={`p-2.5 border rounded-xl flex flex-col items-center justify-center text-sm transition-all ${formData.role === 'officer' ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Building className="h-5 w-5 mb-1" />
                                    Officer
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#0070f3] text-white py-2.5 rounded-full font-semibold shadow-lg hover:bg-blue-600 transform transition hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center mt-4"
                        >
                            {isSubmitting ? <Loader className="animate-spin h-5 w-5" /> : 'Register'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-600 text-sm">
                        Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">Login</Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <img
                        src="/src/assets/login_bg.png"
                        alt="Register Illustration"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
