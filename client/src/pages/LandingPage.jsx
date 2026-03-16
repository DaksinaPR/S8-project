import { Link } from 'react-router-dom';
import { Building2, CheckCircle, ArrowRight, ShieldCheck, Zap, Globe, FileText, Lock } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const LandingPage = () => {
    useDocumentTitle('Home');

    return (
        <div className="font-sans bg-gray-900 text-white min-h-screen selection:bg-blue-500/30">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center overflow-hidden pt-20">
                {/* Animated Background Shapes */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] animate-blob"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/20 blur-[120px] animate-blob delay-200"></div>
                    <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[100px] animate-blob delay-300"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left pt-10 md:pt-0">
                        <div className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-blue-300 mb-8 backdrop-blur-md">
                            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                            GovSingleWindow 2.0 is Live
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                            Government Approvals <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                                Powered by Speed
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-medium">
                            A unified platform to register, apply, and track all your business documents. Start your journey faster than ever.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                            <Link to="/register" className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition transform hover:-translate-y-1">
                                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link to="/login" className="flex items-center justify-center px-8 py-4 rounded-2xl text-lg font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition backdrop-blur-md">
                                Sign In
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end relative mt-12 md:mt-0">
                        {/* Premium Glassmorphism Card Effect */}
                        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] w-full max-w-sm transform md:rotate-2 hover:rotate-0 transition duration-500 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500"></div>

                            <div className="flex items-center space-x-4 mb-8">
                                <div className="h-14 w-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                                    <CheckCircle className="text-white h-7 w-7" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-xl tracking-tight">Permit Approved</h3>
                                    <p className="text-gray-400 text-sm font-medium">Food & Safety Dept</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="h-3 bg-white/10 rounded-full w-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[100%]"></div>
                                </div>
                                <div className="flex justify-between text-xs font-medium text-gray-400">
                                    <span>Processing</span>
                                    <span className="text-white">Complete</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <FileText className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <span className="text-gray-300 font-semibold tracking-wide text-sm">Certificate.pdf</span>
                                </div>
                                <div className="bg-blue-500/20 text-blue-300 py-1.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider">
                                    Ready
                                </div>
                            </div>
                        </div>

                        {/* Decorative floating element */}
                        <div className="absolute -left-10 bottom-10 bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl animate-bounce delay-150 hidden md:block">
                            <ShieldCheck className="h-8 w-8 text-purple-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="relative py-32 overflow-hidden border-t border-white/5 bg-gray-900/50">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Why Choose SingleWindow?</h2>
                        <p className="text-gray-400 text-lg md:text-xl font-medium">Bypass the red tape. Our seamless digital experience securely handles your documents across all government departments simultaneously.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="text-white h-7 w-7" />}
                            color="from-orange-400 to-red-500"
                            shadow="shadow-orange-500/20"
                            title="Lightning Fast"
                            desc="Parallel processing by multiple departments ensures you get approved in record time without endless visits."
                        />
                        <FeatureCard
                            icon={<Globe className="text-white h-7 w-7" />}
                            color="from-blue-400 to-indigo-600"
                            shadow="shadow-blue-500/20"
                            title="Unified Approach"
                            desc="Create one business profile and use it forever. Stop submitting the same documents multiple times."
                        />
                        <FeatureCard
                            icon={<Lock className="text-white h-7 w-7" />}
                            color="from-emerald-400 to-teal-600"
                            shadow="shadow-emerald-500/20"
                            title="Bank-Grade Security"
                            desc="Your sensitive documents are encrypted at rest and in transit, with complete audit logs available."
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-950/80 py-12 border-t border-white/10 backdrop-blur-md">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Building2 className="text-white h-5 w-5" />
                            </div>
                            <span className="text-2xl font-extrabold text-white tracking-tight">GovSingleWindow</span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">Empowering Entrepreneurs. Building the Future.</p>
                    </div>
                    <div className="flex space-x-8 text-sm font-semibold text-gray-400 justify-center">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// eslint-disable-next-line react/prop-types
const FeatureCard = ({ icon, title, desc, color, shadow }) => (
    <div className="p-8 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 group hover:bg-white/10 transition duration-300 w-full relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition duration-500`}></div>
        <div className={`h-16 w-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-lg ${shadow} mb-8 group-hover:scale-110 transition duration-300`}>
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight relative z-10">{title}</h3>
        <p className="text-gray-400 leading-relaxed font-medium relative z-10">{desc}</p>
    </div>
);

export default LandingPage;
