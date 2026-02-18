import { Link, useLocation } from 'react-router-dom';
import { Building2, LayoutDashboard, FileText, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/apply', icon: <PlusCircle size={20} />, label: 'New Application' },
        { path: '/my-applications', icon: <FileText size={20} />, label: 'My Applications' },
    ];

    return (
        <div className={`${isOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 h-screen flex flex-col sticky top-0 transition-all duration-300 relative`}>
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-9 bg-white border border-gray-200 rounded-full p-1 text-gray-400 hover:text-blue-600 shadow-sm z-50 hidden md:flex items-center justify-center transform hover:scale-110 transition-all"
            >
                {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>

            {/* Logo Section */}
            <div className={`h-20 border-b border-gray-100 mb-2 flex items-center ${isOpen ? 'px-6' : 'justify-center px-2'}`}>
                <Link to="/" className="flex items-center space-x-3 group overflow-hidden">
                    <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition duration-300 flex-shrink-0">
                        <Building2 className="text-white h-5 w-5" />
                    </div>
                    <span className={`text-lg font-bold text-gray-800 transition-opacity duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0 hidden'}`}>
                        GovSingleWindow
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-3 py-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        title={!isOpen ? item.label : ''}
                        className={`flex items-center rounded-xl transition-all duration-200 group relative
                            ${isOpen ? 'px-4 py-3 space-x-3' : 'p-3 justify-center'}
                            ${isActive(item.path)
                                ? 'bg-blue-50 text-blue-600 font-medium shadow-sm'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <div className={`${isActive(item.path) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} flex-shrink-0`}>
                            {item.icon}
                        </div>
                        <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 hidden'}`}>
                            {item.label}
                        </span>
                        {isActive(item.path) && isOpen && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></div>
                        )}

                        {/* Tooltip for collapsed state (optional css-only or simple approach) */}
                    </Link>
                ))}
            </nav>


        </div>
    );
};

export default Sidebar;
