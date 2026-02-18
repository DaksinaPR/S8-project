import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Activity, Clock, CheckCircle, FileText, ArrowUpRight, TrendingUp } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });
    const [recentApps, setRecentApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext); // Get user for welcome message

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            try {
                const { data } = await axios.get('http://localhost:5000/api/applications/my', config);
                setRecentApps(data.slice(0, 5));
                setStats({
                    total: data.length,
                    pending: data.filter(a => a.status === 'Pending').length,
                    approved: data.filter(a => a.status === 'Approved').length,
                });
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-6 pb-12 px-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl animate-blob"></div>
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-100/50 blur-3xl animate-blob delay-200"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-indigo-100/50 blur-3xl animate-blob delay-300"></div>
            </div>

            <div className="container mx-auto relative z-10 max-w-6xl">
                {/* Hero Welcome Banner */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 mb-12 shadow-2xl text-white relative overflow-hidden animate-fade-in">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20">
                        <TrendingUp className="absolute top-10 right-10 h-64 w-64 rotate-12" />
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                            Welcome back, {user?.name.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mb-8">
                            Track your business applications, manage approvals, and grow your enterprise with our single-window platform.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/apply" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-1 flex items-center">
                                <FileText className="h-5 w-5 mr-2" /> Start Application
                            </Link>
                            <Link to="/profile" className="bg-blue-700/50 text-white border border-blue-400/30 px-6 py-3 rounded-xl font-bold hover:bg-blue-700/70 transition flex items-center">
                                <Activity className="h-5 w-5 mr-2" /> View Profile
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up delay-100">
                    <StatCard
                        icon={<FileText className="text-blue-600 h-8 w-8" />}
                        label="Total Applications"
                        value={stats.total}
                        bg="bg-blue-50"
                        text="text-blue-900"
                        border="border-blue-100"
                    />
                    <StatCard
                        icon={<Clock className="text-orange-500 h-8 w-8" />}
                        label="Pending Approvals"
                        value={stats.pending}
                        bg="bg-orange-50"
                        text="text-orange-900"
                        border="border-orange-100"
                    />
                    <StatCard
                        icon={<CheckCircle className="text-green-500 h-8 w-8" />}
                        label="Approved Businesses"
                        value={stats.approved}
                        bg="bg-green-50"
                        text="text-green-900"
                        border="border-green-100"
                    />
                </div>

                {/* Recent Activity Section */}
                <div className="grid md:grid-cols-3 gap-8 animate-slide-up delay-200">
                    <div className="md:col-span-2">
                        <div className="glass-panel rounded-3xl p-8 border border-white/60">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                    <Activity className="h-6 w-6 mr-3 text-blue-600" /> Recent Activity
                                </h2>
                                <Link to="/my-applications" className="text-blue-600 font-semibold hover:text-blue-800 transition text-sm">
                                    View All &rarr;
                                </Link>
                            </div>

                            {recentApps.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                                    <div className="inline-block p-4 rounded-full bg-white mb-4 shadow-sm">
                                        <FileText className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 font-medium">No recent activity.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentApps.map(app => (
                                        <div key={app._id} className="flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition duration-200">
                                            <div className={`h-12 w-12 rounded-full flex items-center justify-center mr-4 
                                                ${app.status === 'Approved' ? 'bg-green-100 text-green-600' :
                                                    app.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                                {app.status === 'Approved' ? <CheckCircle className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-800">{app.businessName}</h4>
                                                <p className="text-xs text-gray-500">Submitted on {new Date(app.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                                ${app.status === 'Pending' ? 'bg-orange-50 text-orange-700 ring-1 ring-orange-200' :
                                                    app.status === 'Approved' ? 'bg-green-50 text-green-700 ring-1 ring-green-200' : 'bg-red-50 text-red-700 ring-1 ring-red-200'}`}>
                                                {app.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Tips / Info Column */}
                    <div className="md:col-span-1">
                        <div className="glass-panel rounded-3xl p-6 h-full border border-white/60 bg-gradient-to-b from-white/80 to-blue-50/50">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Did you know?</h3>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                Complete applications with clear documents get approved 2x faster! Make sure your address details are accurate.
                            </p>
                            <div className="p-4 bg-blue-100/50 rounded-xl mb-4">
                                <h4 className="font-bold text-blue-800 text-sm mb-1">AI Scoring Active</h4>
                                <p className="text-blue-600 text-xs">Your applications are pre-screened for quality.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// eslint-disable-next-line react/prop-types
const StatCard = ({ icon, label, value, bg, text, border }) => (
    <div className={`bg-white p-6 rounded-3xl shadow-lg border ${border} relative overflow-hidden group hover:-translate-y-2 transition duration-300`}>
        <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition transform scale-150`}>
            {icon}
        </div>
        <div className="flex items-center space-x-4 relative z-10">
            <div className={`h-16 w-16 rounded-2xl ${bg} flex items-center justify-center shadow-inner`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-500 font-medium mb-1 text-xs uppercase tracking-wider">{label}</p>
                <h3 className={`text-4xl font-extrabold ${text}`}>{value}</h3>
            </div>
        </div>
    </div>
);

export default Dashboard;
