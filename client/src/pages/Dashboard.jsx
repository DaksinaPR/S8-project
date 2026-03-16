import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Activity, Clock, CheckCircle, FileText, ArrowUpRight, TrendingUp, Zap } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

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
                const endpoint = user?.role === 'officer' ? 'http://localhost:5000/api/applications/officer' : 'http://localhost:5000/api/applications/my';
                const { data } = await axios.get(endpoint, config);
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
    }, [user]);

    if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;

    if (user?.role === 'officer') {
        return (
            <div className="min-h-screen bg-gray-900 pt-6 pb-12 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-blob"></div>
                    <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-indigo-600/20 blur-[120px] animate-blob delay-200"></div>
                </div>

                <div className="container mx-auto relative z-10 max-w-6xl">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 mb-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] text-white relative overflow-hidden animate-fade-in group hover:bg-white/10 transition duration-500">
                        <div className="absolute top-0 right-0 w-full h-full opacity-30 group-hover:opacity-50 transition duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/40 via-transparent to-transparent"></div>
                        <div className="relative z-10">
                            <div className="flex items-center space-x-2 text-blue-400 font-bold tracking-wider text-sm mb-4 uppercase">
                                <Activity className="w-5 h-5" /> <span>Officer Portal</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                                Welcome, {user?.name}! 👋
                            </h1>
                            <div className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 mt-2">
                                <span className="text-gray-400 font-medium">Department: </span>
                                <span className="text-white font-bold">{user?.officerCategory || 'General Administration'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up delay-100">
                        <StatCard
                            icon={<Clock className="text-orange-400 h-8 w-8" />}
                            label="Pending Requests"
                            value={stats.pending}
                            bg="bg-orange-500/20"
                            text="text-white"
                            border="border-orange-500/30"
                        />
                        <StatCard
                            icon={<CheckCircle className="text-emerald-400 h-8 w-8" />}
                            label="Approved By You"
                            value={stats.approved}
                            bg="bg-emerald-500/20"
                            text="text-white"
                            border="border-emerald-500/30"
                        />
                        <StatCard
                            icon={<FileText className="text-blue-400 h-8 w-8" />}
                            label="Total Processed"
                            value={stats.total}
                            bg="bg-blue-500/20"
                            text="text-white"
                            border="border-blue-500/30"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 pt-6 pb-12 px-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-blob"></div>
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-600/20 blur-[120px] animate-blob delay-200"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-indigo-600/20 blur-[120px] animate-blob delay-300"></div>
            </div>

            <div className="container mx-auto relative z-10 max-w-6xl">
                {/* Hero Welcome Banner */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 mb-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] text-white relative overflow-hidden animate-fade-in group hover:bg-white/10 transition duration-500">
                    <div className="absolute top-0 right-0 w-full h-full opacity-30 group-hover:opacity-50 transition duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/40 via-transparent to-transparent"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                            Welcome back, {user?.name.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-8 font-medium">
                            Track your business applications, manage approvals, and confidently grow your enterprise with our single-window platform.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/apply" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition transform hover:-translate-y-1 flex items-center">
                                <FileText className="h-5 w-5 mr-2" /> Start Application
                            </Link>
                            <Link to="/profile" className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-2xl font-bold hover:bg-white/20 transition flex items-center">
                                <Activity className="h-5 w-5 mr-2" /> View Profile
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up delay-100">
                    <StatCard
                        icon={<FileText className="text-blue-400 h-8 w-8" />}
                        label="Total Applications"
                        value={stats.total}
                        bg="bg-blue-500/20"
                        text="text-white"
                        border="border-blue-500/30"
                    />
                    <StatCard
                        icon={<Clock className="text-orange-400 h-8 w-8" />}
                        label="Pending Approvals"
                        value={stats.pending}
                        bg="bg-orange-500/20"
                        text="text-white"
                        border="border-orange-500/30"
                    />
                    <StatCard
                        icon={<CheckCircle className="text-emerald-400 h-8 w-8" />}
                        label="Approved Businesses"
                        value={stats.approved}
                        bg="bg-emerald-500/20"
                        text="text-white"
                        border="border-emerald-500/30"
                    />
                </div>

                {/* Recent Activity Section */}
                <div className="grid md:grid-cols-3 gap-8 animate-slide-up delay-200">
                    <div className="md:col-span-2">
                        <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-xl overflow-hidden">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-white flex items-center tracking-tight">
                                    <Activity className="h-6 w-6 mr-3 text-blue-400" /> Recent Activity
                                </h2>
                                <Link to="/my-applications" className="text-blue-400 font-bold hover:text-blue-300 transition text-sm">
                                    View All &rarr;
                                </Link>
                            </div>

                            {recentApps.length === 0 ? (
                                <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/20">
                                    <div className="inline-block p-4 rounded-2xl bg-white/10 mb-4 shadow-sm border border-white/10">
                                        <FileText className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-400 font-medium">No recent activity.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentApps.map(app => (
                                        <div key={app._id} className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm hover:bg-white/10 transition duration-300 group">
                                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0
                                                ${app.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                                    app.status === 'Rejected' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
                                                {app.status === 'Approved' ? <CheckCircle className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
                                            </div>
                                            <div className="flex-1 truncate mr-4">
                                                <h4 className="font-bold text-gray-200 group-hover:text-white transition truncate">{app.businessName}</h4>
                                                <p className="text-xs text-gray-400 mt-1">Submitted on {new Date(app.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap
                                                ${app.status === 'Pending' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                                    app.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
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
                        <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 h-full border border-white/10 relative overflow-hidden group hover:bg-white/10 transition">
                            <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition"></div>
                            <h3 className="text-lg font-bold text-white mb-4 relative z-10 flex items-center">
                                <Zap className="h-5 w-5 mr-2 text-yellow-400" /> Did you know?
                            </h3>
                            <p className="text-gray-400 text-sm mb-6 leading-relaxed relative z-10">
                                Ensure all uploaded documents are highly legible. Clear documents process significantly faster through our unified portal.
                            </p>
                            <div className="p-4 bg-blue-500/10 rounded-xl mb-4 border border-blue-500/20 relative z-10">
                                <h4 className="font-bold text-blue-300 text-sm mb-1">Single-Window Active</h4>
                                <p className="text-blue-200/70 text-xs">Your application routes to all departments simultaneously.</p>
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
    <div className={`bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border border-white/10 relative overflow-hidden group hover:-translate-y-2 transition duration-300`}>
        <div className={`absolute -right-4 -bottom-4 w-28 h-28 rounded-full ${bg} blur-2xl opacity-50 group-hover:opacity-100 transition duration-500`}></div>
        <div className={`absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition transform scale-150`}>
            {icon}
        </div>
        <div className="flex items-center space-x-5 relative z-10">
            <div className={`h-16 w-16 rounded-2xl ${bg} ${border} border flex items-center justify-center shadow-inner`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-400 font-bold mb-1 text-xs uppercase tracking-wider">{label}</p>
                <h3 className={`text-4xl font-extrabold ${text}`}>{value}</h3>
            </div>
        </div>
    </div>
);

export default Dashboard;
