import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bell, CheckCircle, XCircle, FileText, Info, BellOff } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Notifications = () => {
    useDocumentTitle('Notifications');

    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            try {
                // Fetch notifications from the backend
                const { data } = await axios.get('http://localhost:5000/api/notifications', config);
                setNotifications(data);
            } catch (error) {
                console.error("Error fetching notifications", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const markAsRead = async (id) => {
        // Optimistic UI update
        setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error("Error marking notification as read", error);
        }
    };

    const handleNotificationClick = (notification) => {
        if (!notification.isRead) {
            markAsRead(notification._id);
        }
        if (notification.applicationId) {
            navigate(`/application/${notification.applicationId}`);
        }
    };

    const markAllAsRead = async () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/notifications/read-all`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error("Error marking all notifications as read", error);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle className="h-6 w-6 text-emerald-400" />;
            case 'error': return <XCircle className="h-6 w-6 text-red-400" />;
            case 'warning': return <FileText className="h-6 w-6 text-yellow-400" />;
            default: return <Info className="h-6 w-6 text-blue-400" />;
        }
    };

    const getBgColor = (type, isRead) => {
        if (isRead) return 'bg-white/5 border-white/5 opacity-70';
        switch (type) {
            case 'success': return 'bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]';
            case 'error': return 'bg-red-500/10 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)]';
            case 'warning': return 'bg-yellow-500/10 border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.05)]';
            default: return 'bg-blue-500/10 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.05)]';
        }
    };

    const getIconContainerColor = (type, isRead) => {
        if (isRead) return 'bg-gray-800 text-gray-500 border border-gray-700';
        switch (type) {
            case 'success': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
            case 'error': return 'bg-red-500/20 text-red-400 border border-red-500/30';
            case 'warning': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
            default: return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
        }
    }

    if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="relative min-h-screen pt-4 pb-12 w-full animate-fade-in text-white group">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[100px] animate-blob"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center mb-2">
                            <Bell className="h-8 w-8 mr-3 text-blue-500 animate-pulse" /> Notifications Activity
                        </h1>
                        <p className="text-gray-400 font-medium text-lg md:ml-11">Stay informed on system alerts and application updates.</p>
                    </div>

                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="bg-white/10 border border-white/20 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:bg-white/20 flex items-center transition backdrop-blur-md self-start md:self-auto"
                        >
                            <CheckCircle className="h-5 w-5 mr-2 text-emerald-400" /> Confirm All Read
                        </button>
                    )}
                </div>

                {/* Notifications List Card */}
                <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden relative">
                    {/* Inner Glow */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>

                    {notifications.length === 0 ? (
                        <div className="p-20 text-center animate-slide-up relative z-10">
                            <div className="h-28 w-28 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <BellOff className="h-12 w-12 text-gray-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Inbox Clear</h3>
                            <p className="text-gray-400 text-lg">No incoming pings right now. Rest easy!</p>
                        </div>
                    ) : (
                        <div className="p-4 md:p-8 flex flex-col gap-4 relative z-10">
                            {notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className={`p-6 rounded-2xl flex items-start space-x-5 transition-all duration-300 border cursor-pointer hover:scale-[1.01] ${getBgColor(notification.type, notification.isRead)}`}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <div className={`mt-0.5 h-12 w-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${getIconContainerColor(notification.type, notification.isRead)}`}>
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                                            <h4 className={`text-lg transition-colors truncate ${!notification.isRead ? 'font-extrabold text-white' : 'font-bold text-gray-400'}`}>
                                                {notification.title}
                                            </h4>
                                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap bg-black/20 px-2.5 py-1 rounded-lg">
                                                {new Date(notification.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className={`text-sm leading-relaxed ${!notification.isRead ? 'text-gray-300 font-medium' : 'text-gray-500'}`}>
                                            {notification.message}
                                        </p>
                                    </div>
                                    {!notification.isRead && (
                                        <div className="flex items-center self-center shrink-0 ml-4">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
