import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye, Search, Calendar, ChevronRight } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const MyApplications = () => {
    useDocumentTitle('My Applications');

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            try {
                const { data } = await axios.get('http://localhost:5000/api/applications/my', config);
                setApplications(data);
            } catch (error) {
                console.error("Error fetching applications", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'Rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'ActionRequired': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Pending': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;

    return (
        <div className="relative min-h-screen pt-4 pb-12 w-full animate-fade-in text-white">
            <div className="container mx-auto max-w-7xl">

                {/* Header Section */}
                <div className="mb-10 text-left">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center mb-2">
                        <FileText className="h-8 w-8 mr-3 text-blue-500" /> My Applications
                    </h1>
                    <p className="text-gray-400 font-medium text-lg ml-11">Track and manage all your submitted government requests.</p>
                </div>

                {/* Search Bar Block */}
                <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 p-5 mb-10 overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 relative z-10">
                        <div className="flex-1 relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="w-full pl-12 pr-5 py-4 bg-gray-900/50 border border-white/10 rounded-2xl focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition font-medium text-white placeholder-gray-500 shadow-inner"
                                placeholder="Search by Application ID or Name..."
                            />
                        </div>
                        <button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-0.5 text-white font-bold py-4 px-8 rounded-2xl transition duration-300">
                            Search Records
                        </button>
                    </div>
                </div>

                {/* Applications Table Block */}
                <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white/10 overflow-hidden">
                    <div className="p-8 border-b border-white/10 flex flex-col md:flex-row justify-between items-center bg-white/5">
                        <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Recent Submissions</h2>
                        <span className="px-5 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-xs font-black tracking-widest shadow-inner">
                            {applications.length} TOTAL RECORDS
                        </span>
                    </div>

                    {applications.length === 0 ? (
                        <div className="p-20 text-center animate-slide-up">
                            <div className="h-28 w-28 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-blue-500/20">
                                <FileText className="h-12 w-12" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Got a new idea?</h3>
                            <p className="text-gray-400 mb-10 max-w-md mx-auto text-lg leading-relaxed">You haven't submitted any applications yet. Let's get your business moving today.</p>
                            <Link to="/apply" className="inline-flex items-center text-white bg-blue-600 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:bg-blue-500 transform transition duration-300 hover:-translate-y-1">
                                Start New Application <ChevronRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-900/60 border-b border-white/10">
                                        <th className="py-5 px-8 text-xs font-extrabold tracking-widest text-gray-500 uppercase w-1/6">App ID</th>
                                        <th className="py-5 px-8 text-xs font-extrabold tracking-widest text-gray-500 uppercase w-1/4">Entity Name</th>
                                        <th className="py-5 px-8 text-xs font-extrabold tracking-widest text-gray-500 uppercase w-1/6">Submitted</th>
                                        <th className="py-5 px-8 text-xs font-extrabold tracking-widest text-gray-500 uppercase w-1/6">Status</th>
                                        <th className="py-5 px-8 text-xs font-extrabold tracking-widest text-gray-500 uppercase">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {applications.map((app) => (
                                        <tr key={app._id} className="hover:bg-white/5 transition duration-200 group">
                                            <td className="py-6 px-8">
                                                <span className="bg-gray-800 text-gray-400 text-xs font-mono font-bold px-3 py-1.5 rounded border border-gray-700 shadow-inner group-hover:bg-gray-700 transition">
                                                    {app.applicationId || `APP-${new Date(app.createdAt).getFullYear()}-${app._id.substring(app._id.length - 8)}`}
                                                </span>
                                            </td>
                                            <td className="py-6 px-8 font-bold text-white text-lg tracking-tight">
                                                {app.businessName}
                                            </td>
                                            <td className="py-6 px-8 text-gray-400 font-medium flex items-center mt-1">
                                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                                {new Date(app.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="py-6 px-8">
                                                <span className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border ${getStatusColor(app.status || 'Pending')}`}>
                                                    {app.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="py-6 px-8 text-gray-400 text-sm max-w-xs truncate font-medium" title={app.aiFeedback || '--'}>
                                                {app.aiFeedback || '--'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyApplications;
