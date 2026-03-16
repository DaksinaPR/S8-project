import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, AlertTriangle, FileText, CheckCircle, Tag, ArrowRight, Activity, XCircle, Building2, User } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';
import useDocumentTitle from '../hooks/useDocumentTitle';

const AiValidationPage = () => {
    useDocumentTitle('Application Review');

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectInput, setShowRejectInput] = useState(false);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const { data } = await axios.get(`http://localhost:5000/api/applications/${id}`, config);
                setApplication(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching application details');
            } finally {
                setLoading(false);
            }
        };

        fetchApplication();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
    if (error) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-500 font-bold">{error}</div>;
    if (!application) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">Application not found.</div>;

    const { department, businessName, status, applicationId } = application;

    const handleAction = async (newStatus) => {
        if (newStatus === 'Rejected' && !rejectReason) {
            toast.error("Please provide a reason for rejection.");
            return;
        }

        setActionLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            await axios.put(`http://localhost:5000/api/applications/${id}/status`, {
                status: newStatus,
                remarks: newStatus === 'Rejected' ? rejectReason : 'Application Approved by Officer'
            }, config);

            toast.success(`Application successfully ${newStatus.toLowerCase()}!`);
            navigate(newStatus === 'Approved' ? '/approved-certifications' : '/rejected-certifications');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error updating status');
            setActionLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 pt-12 pb-12 px-6 relative overflow-hidden text-white">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[10%] w-[45%] h-[45%] rounded-full bg-indigo-600/10 blur-[120px] animate-blob delay-200"></div>
                <div className="absolute top-[30%] left-[-20%] w-[35%] h-[35%] rounded-full bg-purple-600/10 blur-[120px] animate-blob delay-300"></div>
            </div>

            <div className="container mx-auto relative z-10 max-w-5xl">
                <div className="text-center mb-12 animate-fade-in relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
                    <div className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 text-blue-400 rounded-3xl mb-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] shadow-blue-500/10">
                        <FileText className="h-10 w-10" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">Application Review</h1>
                    <p className="text-gray-400 mt-2 text-lg md:text-xl font-medium">
                        Detailed review for <span className="font-bold text-white border-b border-white/20 pb-1">{businessName}</span>
                    </p>
                    <div className="mt-4 inline-block bg-gray-900 border border-gray-700 text-gray-300 px-4 py-1.5 rounded-full text-sm font-mono font-bold tracking-widest shadow-inner">
                        {applicationId || 'N/A'}
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 mb-8">
                    {/* Details Card */}
                    <div className="lg:col-span-2 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 animate-slide-up relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition duration-500"></div>

                        <h2 className="text-2xl font-bold flex items-center mb-8 text-white tracking-tight relative z-10">
                            <ShieldCheck className="mr-3 text-blue-400 h-7 w-7" /> Entity Details
                        </h2>

                        <div className="space-y-8 relative z-10">
                            <div className="bg-gray-900/50 p-5 rounded-2xl border border-white/5 shadow-inner">
                                <p className="text-xs text-gray-500 font-bold mb-1.5 tracking-widest uppercase flex items-center">
                                    <Building2 className="w-3.5 h-3.5 mr-1.5" /> Business Name
                                </p>
                                <p className="text-xl font-bold text-white">{businessName}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 bg-gray-900/50 p-5 rounded-2xl border border-white/5 shadow-inner">
                                    <p className="text-xs text-gray-500 font-bold mb-2 tracking-widest uppercase">Current Status</p>
                                    <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border shadow-sm
                                        ${status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                                            status === 'Rejected' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'}`}>
                                        {status === 'Approved' ? <CheckCircle className="w-3.5 h-3.5 mr-1" /> : status === 'Rejected' ? <XCircle className="w-3.5 h-3.5 mr-1" /> : <Activity className="w-3.5 h-3.5 mr-1" />}
                                        {status}
                                    </span>
                                </div>
                                <div className="flex-1 bg-gray-900/50 p-5 rounded-2xl border border-white/5 shadow-inner">
                                    <p className="text-xs text-gray-500 font-bold mb-2 tracking-widest uppercase">Department</p>
                                    <div className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-xl inline-block font-bold text-sm">
                                        {department || application.businessType}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-900/50 p-5 rounded-2xl border border-white/5 shadow-inner">
                                <p className="text-xs text-gray-500 font-bold mb-2 tracking-widest uppercase flex items-center">
                                    <User className="w-3.5 h-3.5 mr-1.5" /> Applicant Contact
                                </p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-gray-200">{application.user?.name || application.founderName || 'Unknown Applicant'}</p>
                                        <p className="text-sm text-gray-400">{application.user?.email || application.founderEmail || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents Card */}
                    <div className="lg:col-span-3 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 animate-slide-up delay-100 flex flex-col group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition duration-500"></div>

                        <h2 className="text-2xl font-bold flex items-center mb-8 text-white tracking-tight relative z-10">
                            <FileText className="mr-3 text-purple-400 h-7 w-7" /> Uploaded Documents
                        </h2>

                        {application.documents && application.documents.length > 0 ? (
                            <div className="grid sm:grid-cols-2 gap-4 flex-grow content-start relative z-10">
                                {application.documents.map((doc, idx) => (
                                    <div key={idx} className="flex flex-col p-5 bg-gray-900/60 hover:bg-gray-800 border border-white/5 hover:border-white/20 rounded-2xl transition duration-300 shadow-inner group/item">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="h-10 w-10 rounded-xl bg-white/5 text-gray-400 flex items-center justify-center shrink-0 border border-white/10 group-hover/item:text-blue-400 group-hover/item:bg-blue-500/10 group-hover/item:border-blue-500/30 transition-all">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-500 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl shrink-0 transition shadow-sm flex items-center">
                                                <Eye className="w-3.5 h-3.5 mr-1.5" /> View
                                            </a>
                                        </div>
                                        <div className="mt-auto">
                                            <span className="text-sm font-semibold text-gray-200 line-clamp-2" title={doc.name}>{doc.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-grow flex flex-col items-center justify-center p-10 bg-orange-500/5 border border-orange-500/20 rounded-2xl text-center relative z-10">
                                <div className="h-16 w-16 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
                                    <AlertTriangle className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-orange-400 mb-2">No Documents Found</h3>
                                <p className="text-orange-300/70">The applicant did not provide any files with this submission.</p>
                            </div>
                        )}
                    </div>
                </div>

                {user?.role === 'officer' && status === 'Pending' ? (
                    <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 animate-slide-up delay-200 mt-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-600/5 via-transparent to-transparent pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 relative z-10 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center text-white tracking-tight">
                                    <ShieldCheck className="mr-3 text-emerald-400 h-7 w-7" /> Officer Actions
                                </h2>
                                <p className="text-gray-400 mt-1">Finalize your review for this application.</p>
                            </div>

                            {!showRejectInput && (
                                <div className="flex items-center space-x-2 bg-gray-900/50 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
                                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest px-2">Awaiting Decision</span>
                                </div>
                            )}
                        </div>

                        {!showRejectInput ? (
                            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                                <button
                                    onClick={() => handleAction('Approved')}
                                    disabled={actionLoading}
                                    className="flex-1 flex items-center justify-center bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 hover:border-emerald-500 py-4 rounded-2xl font-bold shadow-lg transition duration-300 group"
                                >
                                    <CheckCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> Approve Application
                                </button>
                                <button
                                    onClick={() => setShowRejectInput(true)}
                                    className="flex-1 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 py-4 rounded-2xl font-bold transition duration-300 group"
                                >
                                    <XCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> Reject with Reasons
                                </button>
                            </div>
                        ) : (
                            <div className="bg-red-500/5 border border-red-500/20 p-6 md:p-8 rounded-[2rem] relative z-10 transition-all">
                                <div className="flex items-center mb-6">
                                    <div className="h-10 w-10 rounded-xl bg-red-500/20 text-red-500 flex items-center justify-center mr-4">
                                        <AlertTriangle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-red-400">Rejection Details</h3>
                                        <p className="text-sm text-red-300/70">Specify what documents are missing or invalid.</p>
                                    </div>
                                </div>
                                <textarea
                                    className="w-full p-4 bg-gray-900 border border-red-500/30 rounded-2xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none text-white font-medium resize-none shadow-inner placeholder-gray-600 mb-6"
                                    rows="4"
                                    placeholder="e.g. The uploaded FSSAI License is expired. Please upload a valid current license."
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                ></textarea>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => handleAction('Rejected')}
                                        disabled={actionLoading}
                                        className="flex-1 bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/30 py-4 rounded-2xl font-bold transition duration-300 flex items-center justify-center"
                                    >
                                        <XCircle className="w-5 h-5 mr-2" /> Confirm Rejection
                                    </button>
                                    <button
                                        onClick={() => setShowRejectInput(false)}
                                        className="sm:w-1/3 bg-gray-800 hover:bg-gray-700 text-gray-300 py-4 rounded-2xl font-bold transition duration-300 border border-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center animate-fade-in delay-200 mt-10">
                        <Link to={user?.role === 'officer' ? "/requested-certifications" : "/dashboard"} className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-white/10 hover:border-white/20 transition transform hover:-translate-y-1">
                            <ArrowLeft className="mr-2 h-5 w-5" /> Return to Dashboard
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AiValidationPage;
