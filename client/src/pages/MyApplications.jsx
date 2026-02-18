import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';

const MyApplications = () => {
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
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            case 'ActionRequired': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-6 pb-12 px-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-green-100/40 blur-3xl animate-blob"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-blue-100/40 blur-3xl animate-blob delay-200"></div>
            </div>

            <div className="container mx-auto relative z-10 max-w-6xl">
                <div className="flex justify-end mb-8">
                    <Link to="/apply" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-700 hover:shadow-blue-500/40 transition transform hover:-translate-y-1 flex items-center animate-fade-in delay-200">
                        <FileText className="h-5 w-5 mr-2" /> Start New Application
                    </Link>
                </div>

                {applications.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-16 text-center border border-white/50 animate-slide-up">
                        <div className="h-24 w-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <FileText className="h-12 w-12" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-3">No applications found</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">You haven't submitted any applications yet. Start your entrepreneurial journey today!</p>
                        <Link to="/apply" className="text-blue-600 font-bold hover:text-blue-800 hover:underline text-lg">Start New Application &rarr;</Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up delay-100">
                        {applications.map((app, index) => (
                            <div key={app._id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
                                {/* Card Header */}
                                <div className="p-6 pb-4 flex justify-between items-start">
                                    <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                                        <FileText className="h-7 w-7" />
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border
                                        ${app.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                                            app.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                                'bg-orange-50 text-orange-700 border-orange-200'}`}>
                                        {app.status}
                                    </span>
                                </div>

                                {/* Card Body */}
                                <div className="px-6 flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition">{app.businessName}</h3>
                                    <p className="text-sm font-medium text-gray-500 flex items-center mb-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span> {app.businessType}
                                    </p>

                                    <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                                        <div className="flex justify-between items-center text-sm mb-2">
                                            <span className="text-gray-500">AI Readiness Score</span>
                                            <span className="font-bold text-gray-800">{app.aiScore}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                            <div className={`h-2 rounded-full transition-all duration-1000 ease-out 
                                                ${app.aiScore > 80 ? 'bg-green-500' : app.aiScore > 50 ? 'bg-orange-500' : 'bg-red-500'}`}
                                                style={{ width: `${app.aiScore}%` }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="p-6 pt-0 mt-auto border-t border-gray-50">
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="text-xs text-gray-400 font-medium flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center group-hover:translate-x-1 transition">
                                            Details <Eye className="h-4 w-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyApplications;
