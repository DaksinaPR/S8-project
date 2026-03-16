import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
import { LogOut, Bell, Search } from 'lucide-react';
import { io } from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const DashboardLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        if (user) {
            // Connect to Socket.io server
            const socket = io('http://localhost:5000');

            // Emit setup with user ID to join personal room
            socket.emit('setup', user._id);

            // Listen for new notifications
            socket.on('newNotification', (newSystemNotification) => {
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 pt-0.5">
                                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                        <Bell className="h-5 w-5" />
                                    </div>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-bold text-gray-900">
                                        {newSystemNotification.title}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {newSystemNotification.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-gray-200">
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ), { duration: 5000, position: 'top-right' });
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [user]);

    return (
        <div className="flex h-screen dark:bg-gray-950 bg-gray-50 font-sans selection:bg-blue-500/30 dark:text-white text-gray-900 transition-colors duration-300">
            <Toaster />
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Global Background Elements for Dashboard Area */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-blob"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-blob delay-200"></div>
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 md:p-8 relative z-10 custom-scrollbar">
                    <Outlet />
                </main>
            </div>

            {/* Chatbot */}
            <Chatbot />
        </div>
    );
};

export default DashboardLayout;
