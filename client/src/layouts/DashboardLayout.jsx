import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
import { LogOut, Bell, Search } from 'lucide-react';

const DashboardLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 z-10 transition-all duration-300">
                    {/* Search Bar (Optional visual element) */}
                    <div className="flex items-center w-96 relative hidden md:block">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search applications, services..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                        />
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-8 relative">
                    <Outlet />
                </main>
            </div>

            {/* Chatbot */}
            <Chatbot />
        </div>
    );
};

export default DashboardLayout;
