import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle, XCircle, Search, Eye, Calendar, Building2 } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

// eslint-disable-next-line react/prop-types
const OfficerCertifications = ({ title, statusFilter }) => {
    useDocumentTitle(title);

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {}
                };

                if (statusFilter) {
                    config.params.status = statusFilter;
                }

                console.log("Fetching applications with config:", config);
                const { data } = await axios.get('http://localhost:5000/api/applications/officer', config);
                console.log("Data received:", data);
                setApplications(data);
            } catch (error) {
                console.error("Error fetching officer applications", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.role === 'officer') {
            fetchApplications();
        }
    }, [statusFilter, user]);

    const filteredApps = applications.filter(app =>
        app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return <CheckCircle className="h-5 w-5 mr-1.5" />;
            case 'Rejected': return <XCircle className="h-5 w-5 mr-1.5" />;
            case 'Pending':
            default: return <Clock className="h-5 w-5 mr-1.5" />;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Approved': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'Rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'Pending':
            default: return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;

    const Icon = statusFilter === 'Pending' ? Clock : statusFilter === 'Approved' ? CheckCircle : statusFilter === 'Rejected' ? XCircle : FileText;
    const iconColor = statusFilter === 'Pending' ? 'text-orange-400' : statusFilter === 'Approved' ? 'text-emerald-400' : statusFilter === 'Rejected' ? 'text-red-400' : 'text-blue-400';

    return (
        <div className="relative min-h-screen pt-4 pb-12 w-full animate-fade-in text-white">
            <div className="container mx-auto max-w-7xl">

                {/* Header Section */}
                <div className="mb-10 text-left">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center mb-2">
                        <Icon className={`h-8 w-8 mr-3 ${iconColor}`} /> {title}
                    </h1>
                    <p className="text-gray-400 font-medium text-lg ml-11">Manage and review business applications corresponding to your department.</p>
                </div>

                {/* Search Bar Block */}
                <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 p-5 mb-10 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-full h-full opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 relative z-10">
                        <div className="flex-1 relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="w-full pl-12 pr-5 py-4 bg-gray-900/50 border border-white/10 rounded-2xl focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition font-medium text-white placeholder-gray-500 shadow-inner"
                                placeholder="Search applications by ID or Business Name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Applications Table Block */}
                <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white/10 overflow-hidden">
                    <div className="p-8 border-b border-white/10 flex flex-col md:flex-row justify-between items-center bg-white/5">
                        <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Found Records</h2>
                        <span className="px-5 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-xs font-black tracking-widest shadow-inner">
                            {filteredApps.length} TOTAL QUEUED
                        </span>
                    </div>

                    {filteredApps.length === 0 ? (
                        <div className="p-20 text-center animate-slide-up">
                            <div className={`h-28 w-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border 
                                bg-gray-800 border-gray-700`}>
                                <FileText className="h-12 w-12 text-gray-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Queue Empty</h3>
                            <p className="text-gray-400 mb-10 max-w-md mx-auto text-lg leading-relaxed">There are no {statusFilter ? statusFilter.toLowerCase() : ''} applications matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-900/60 border-b border-white/10">
                                        <th className="py-5 px-8 text-xs font-extrabold tracking-widest text-gray-500 uppercase w-1/6">App ID & Date</th>
                                        <th className="py-5 px-8 text-xs font-extrabold tracking-widest text-gray-500 uppercase w-1/4">Business Details</th>
                                        <th className="py-5 px-8 text-xs font-extrabold tracking-widest text-gray-500 uppercase w-1/5">Applicant</th>
                                        {statusFilter === 'Rejected' && (
                                            <th className="py-5 px-8 text-xs font-extrabold tracking-widest text-gray-500 uppercase w-1/6">Reason</th>
                                        )}
                                        <th className="py-5 px-8 text-xs font-extrabold tracking-widest text-gray-500 uppercase w-1/6">Status</th>
                                        <th className="py-5 px-8 text-xs font-extrabold tracking-widest text-gray-500 uppercase text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredApps.map((app) => (
                                        <tr key={app._id} className="hover:bg-white/5 transition duration-200 group">
                                            <td className="py-6 px-8">
                                                <div className="bg-gray-800 text-blue-400 text-xs font-mono font-bold px-3 py-1.5 rounded border border-gray-700 shadow-inner group-hover:bg-gray-700 transition inline-block mb-2">
                                                    {app.applicationId}
                                                </div>
                                                <div className="flex items-center text-xs text-gray-500 font-medium">
                                                    <Calendar className="h-3 w-3 mr-1" />
                                                    {new Date(app.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="py-6 px-8">
                                                <div className="font-bold text-white text-lg tracking-tight mb-1">
                                                    {app.businessName}
                                                </div>
                                                <div className="text-xs text-gray-400 flex items-center bg-white/5 inline-block px-2 py-1 rounded">
                                                    <Building2 className="h-3 w-3 mr-1" /> {app.businessType}
                                                </div>
                                            </td>
                                            <td className="py-6 px-8 text-gray-300">
                                                <div className="font-semibold text-sm mb-1">{app.user?.name || 'Unknown'}</div>
                                                <div className="text-xs text-gray-500 font-medium">{app.user?.email || 'N/A'}</div>
                                            </td>
                                            {statusFilter === 'Rejected' && (
                                                <td className="py-6 px-8 text-red-400 text-sm max-w-xs truncate font-medium" title={app.aiFeedback || 'No reason provided'}>
                                                    {app.aiFeedback || 'No reason provided'}
                                                </td>
                                            )}
                                            <td className="py-6 px-8">
                                                <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border ${getStatusBadge(app.status)}`}>
                                                    {getStatusIcon(app.status)}
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="py-6 px-8 text-right">
                                                <Link
                                                    to={`/application/${app._id}/validation`}
                                                    className="inline-flex items-center text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-500 px-4 py-2 rounded-xl transition duration-200 shadow-sm"
                                                >
                                                    <Eye className="h-4 w-4 mr-2" /> Review
                                                </Link>
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

export default OfficerCertifications;
