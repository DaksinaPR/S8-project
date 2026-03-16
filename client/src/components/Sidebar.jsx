import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, LayoutDashboard, FileText, PlusCircle, ChevronLeft, ChevronRight, Search, Bell, User, Award, Clock, CheckCircle, XCircle, LogOut, Sun, Moon } from 'lucide-react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const isActive = (path) => location.pathname === path;

    const entrepreneurNavItems = [
        { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/search', icon: <Search size={20} />, label: 'Search' },
        { path: '/apply', icon: <PlusCircle size={20} />, label: 'New Application' },
        { path: '/certifications', icon: <Award size={20} />, label: 'Get Certification' },
        { path: '/my-applications', icon: <FileText size={20} />, label: 'My Applications' },
        { path: '/notifications', icon: <Bell size={20} />, label: 'Notifications' },
    ];

    const officerNavItems = [
        { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/requested-certifications', icon: <Clock size={20} />, label: 'Requested Certifications' },
        { path: '/approved-certifications', icon: <CheckCircle size={20} />, label: 'Approved Certifications' },
        { path: '/rejected-certifications', icon: <XCircle size={20} />, label: 'Rejected Certifications' },
        { path: '/notifications', icon: <Bell size={20} />, label: 'Notifications' },
    ];

    const activeNavItems = user?.role === 'officer' ? officerNavItems : entrepreneurNavItems;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={`${isOpen ? 'w-64' : 'w-20'} dark:bg-gray-900/50 dark:border-white/10 bg-white/80 border-r border-gray-200 backdrop-blur-xl h-screen flex flex-col sticky top-0 transition-all duration-300 relative z-20`}>
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-9 dark:bg-gray-800 dark:border-white/10 dark:text-gray-400 dark:hover:text-white bg-white border border-gray-200 text-gray-500 hover:text-gray-800 rounded-full p-1 shadow-lg shadow-black/10 dark:shadow-black/50 z-50 hidden md:flex items-center justify-center transform hover:scale-110 transition-all"
            >
                {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>

            {/* Logo Section */}
            <div className={`h-20 border-b dark:border-white/10 border-gray-200 mb-2 flex items-center ${isOpen ? 'px-6' : 'justify-center px-2'}`}>
                <Link to="/" className="flex items-center space-x-3 group overflow-hidden">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl group-hover:shadow-lg group-hover:shadow-blue-500/30 transition duration-300 flex-shrink-0">
                        <Building2 className="text-white h-5 w-5" />
                    </div>
                    <span className={`text-xl font-extrabold dark:text-white text-gray-900 transition-opacity duration-300 whitespace-nowrap tracking-tight ${isOpen ? 'opacity-100' : 'opacity-0 w-0 hidden'}`}>
                        SingleWindow
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto custom-scrollbar">
                {activeNavItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        title={!isOpen ? item.label : ''}
                        className={`flex items-center rounded-2xl transition-all duration-200 group relative
                            ${isOpen ? 'px-4 py-3.5 space-x-3' : 'p-3 text-center justify-center'}
                            ${isActive(item.path)
                                ? 'bg-blue-600/10 dark:bg-blue-600/20 shadow-inner border border-blue-500/20 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 font-bold'
                                : 'text-gray-600 dark:text-gray-400 border border-transparent hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200 dark:hover:border-white/10'
                            }`}
                    >
                        <div className={`${isActive(item.path) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'} flex-shrink-0 transition-colors`}>
                            {item.icon}
                        </div>
                        <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 hidden'}`}>
                            {item.label}
                        </span>
                    </Link>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-3 border-t dark:border-white/10 border-gray-200 mb-2 mt-auto">
                <button
                    onClick={toggleTheme}
                    title={!isOpen ? 'Toggle Theme' : ''}
                    className={`w-full mb-2 flex items-center rounded-2xl transition-all duration-200 group relative
                        ${isOpen ? 'px-4 py-3.5 space-x-3' : 'p-3 justify-center'}
                        text-gray-600 dark:text-gray-400 border border-transparent hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200 dark:hover:border-white/10 text-left`}
                >
                    <div className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex-shrink-0 transition-colors">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </div>
                    <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 max-w-full font-medium' : 'opacity-0 max-w-0 hidden'}`}>
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                </button>

                <Link
                    to="/profile"
                    title={!isOpen ? 'Profile' : ''}
                    className={`flex items-center rounded-2xl transition-all duration-200 group relative
                        ${isOpen ? 'px-4 py-3.5 space-x-3' : 'p-3 justify-center'}
                        ${isActive('/profile')
                            ? 'bg-blue-600/10 dark:bg-blue-600/20 shadow-inner border border-blue-500/20 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 font-bold'
                            : 'text-gray-600 dark:text-gray-400 border border-transparent hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200 dark:hover:border-white/10'
                        }`}
                >
                    <div className={`${isActive('/profile') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'} flex-shrink-0 transition-colors`}>
                        <User size={20} />
                    </div>
                    <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 hidden'}`}>
                        Profile Settings
                    </span>
                </Link>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    title={!isOpen ? 'Logout' : ''}
                    className={`w-full mt-2 flex items-center rounded-2xl transition-all duration-200 group relative
                        ${isOpen ? 'px-4 py-3.5 space-x-3' : 'p-3 justify-center'}
                        text-red-500 dark:text-red-400 border border-transparent hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 dark:hover:border-red-500/20 text-left`}
                >
                    <div className="text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300 flex-shrink-0 transition-colors">
                        <LogOut size={20} />
                    </div>
                    <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 max-w-full font-semibold' : 'opacity-0 max-w-0 hidden'}`}>
                        Log Out
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
