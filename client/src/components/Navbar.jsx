import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Building2, LogOut, LayoutDashboard, FileText, User, PlusCircle } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-3 group">
                    <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition duration-300">
                        <Building2 className="text-white h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                        GovSingleWindow
                    </span>
                </Link>

                {user ? (
                    <div className="flex items-center space-x-2 md:space-x-6">
                        <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition flex items-center">
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            Dashboard
                        </Link>

                        <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

                        <Link
                            to="/profile"
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive('/profile') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                {user.name.charAt(0)}
                            </div>
                            <span className="font-medium hidden md:block">{user.name.split(' ')[0]}</span>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                            title="Logout"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition">Login</Link>
                        <Link to="/register" className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-700 hover:shadow-lg transition transform active:scale-95">
                            Get Started
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

// eslint-disable-next-line react/prop-types
const NavLink = ({ to, icon, label, isActive }) => (
    <Link
        to={to}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm
            ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
    >
        {icon}
        <span className="hidden md:inline">{label}</span>
    </Link>
);

export default Navbar;
