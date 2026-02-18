import { Link } from 'react-router-dom';
import { Building2, CheckCircle, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="font-sans">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 min-h-screen flex items-center overflow-hidden">

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-500 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-500 rounded-full blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-12 md:mb-0">
                        <div className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-6 border border-blue-500/30">
                            🚀 Revolutionizing Business Approvals
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                            Launch Your Dream <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                With Zero Friction
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                            A unified platform for all government approvals. Apply once, track everywhere, and get started faster than ever before.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link to="/register" className="flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition transform active:scale-95 duration-200">
                                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link to="/login" className="flex items-center justify-center px-8 py-4 rounded-xl text-lg font-semibold text-white border border-white/20 hover:bg-white/10 transition">
                                Existing User?
                            </Link>
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center relative">
                        {/* Glassmorphism Card Effect */}
                        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-sm transform rotate-3 hover:rotate-1 transition duration-500">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                    <CheckCircle className="text-white h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Permit Approved</h3>
                                    <p className="text-gray-300 text-sm">Just now</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-2 bg-white/20 rounded w-full"></div>
                                <div className="h-2 bg-white/20 rounded w-3/4"></div>
                                <div className="h-2 bg-white/20 rounded w-1/2"></div>
                            </div>
                            <div className="mt-6 flex justify-between items-center">
                                <span className="text-blue-300 font-medium">Status</span>
                                <span className="bg-green-500/20 text-green-300 py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-2 bg-white/50 rounded-full mt-2"></div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SingleWindow?</h2>
                        <p className="text-gray-600 text-lg">We simplify the complex web of bureaucratic approvals into a seamless, digital experience.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        <FeatureCard
                            icon={<Zap className="text-white" />}
                            color="bg-orange-500"
                            title="Lightning Fast"
                            desc="Parallel processing by multiple departments ensures you get approved in record time."
                        />
                        <FeatureCard
                            icon={<Globe className="text-white" />}
                            color="bg-blue-600"
                            title="Single Digital Identity"
                            desc="Create one profile and use it for all future interactions with the government."
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="text-white" />}
                            color="bg-green-500"
                            title="Secure & Transparent"
                            desc="Real-time tracking of your application status with complete accountability."
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 py-12 border-t border-gray-800">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                            <Building2 className="text-blue-500 h-6 w-6" />
                            <span className="text-xl font-bold text-white">GovSingleWindow</span>
                        </div>
                        <p className="text-gray-400 text-sm">Empowering Entrepreneurs, Building the Future.</p>
                    </div>
                    <div className="flex space-x-6 text-gray-400">
                        <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
                        <a href="#" className="hover:text-blue-400 transition">Contact Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// eslint-disable-next-line react/prop-types
const FeatureCard = ({ icon, title, desc, color }) => (
    <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition hover:-translate-y-2 border border-gray-100 group">
        <div className={`h-14 w-14 ${color} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition duration-300`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
);

export default LandingPage;
