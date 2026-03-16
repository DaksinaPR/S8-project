import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { User, Mail, Phone, Shield, LogOut, Edit2, Save, X, Loader } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const ProfilePage = () => {
    useDocumentTitle('Profile');

    const { user, logout, updateProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '' // Optional
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    if (!user) return <div className="min-h-screen bg-gray-950 flex items-center justify-center p-10 text-white font-bold"><Loader className="animate-spin w-8 h-8 mr-3 text-blue-500" /> Loading Profile...</div>;

    const startEditing = () => {
        setFormData({
            name: user.name,
            email: user.email,
            mobile: user.mobile || '',
            password: ''
        });
        setIsEditing(true);
        setMessage({ type: '', text: '' });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setMessage({ type: '', text: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const res = await updateProfile(formData);
        setIsSubmitting(false);
        if (res.success) {
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } else {
            setMessage({ type: 'error', text: res.error });
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-950 pt-12 pb-12 w-full animate-fade-in text-white overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px] animate-blob delay-200"></div>
            </div>

            <div className="container mx-auto max-w-5xl relative z-10">
                <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden border border-white/10 group">

                    {/* Header Banner */}
                    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/40 via-purple-600/20 to-gray-900 border-b border-white/10 h-32 md:h-48 relative overflow-hidden">
                        <div className="absolute inset-0 bg-transparent opacity-30 mix-blend-overlay"></div>
                    </div>

                    <div className="px-8 pb-10 relative">
                        {/* Avatar & Actions */}
                        <div className="flex flex-col md:flex-row justify-between items-end -mt-16 md:-mt-20 mb-10 relative z-10 gap-6">
                            <div className="flex items-end">
                                <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-[6px] border-gray-900 shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-extrabold relative group-hover:shadow-blue-500/20 transition duration-500">
                                    {user.name.charAt(0)}
                                    <div className="absolute bottom-1 right-1 h-6 w-6 bg-emerald-500 border-4 border-gray-900 rounded-full"></div>
                                </div>
                                <div className="ml-8 mb-4 hidden md:block">
                                    <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">{user.name}</h1>
                                    <p className="text-blue-200 font-medium text-lg bg-black/20 px-3 py-1 rounded-xl inline-block mt-2 backdrop-blur-sm border border-white/5">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex space-x-4 mt-8 md:mt-0 w-full md:w-auto">
                                {!isEditing && (
                                    <button
                                        onClick={startEditing}
                                        className="flex-1 md:flex-none justify-center flex items-center px-6 py-3 bg-white/10 border border-white/20 text-white rounded-2xl hover:bg-white/20 hover:border-white/30 transition shadow-lg backdrop-blur-md font-bold"
                                    >
                                        <Edit2 className="h-5 w-5 mr-2" /> Edit Details
                                    </button>
                                )}
                                <button
                                    onClick={logout}
                                    className="flex-1 md:flex-none justify-center flex items-center px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white hover:border-red-500 transition shadow-lg backdrop-blur-md font-bold"
                                >
                                    <LogOut className="h-5 w-5 mr-2" /> Sign Out
                                </button>
                            </div>
                        </div>

                        {/* Mobile Name (Visible only on small screens) */}
                        <div className="md:hidden mb-10 text-center bg-gray-900/50 p-6 rounded-3xl border border-white/5">
                            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">{user.name}</h1>
                            <p className="text-blue-300 font-medium">{user.email}</p>
                        </div>

                        {message.text && (
                            <div className={`p-5 rounded-2xl mb-8 flex items-center shadow-lg border backdrop-blur-md animate-slide-up ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
                                <span className="mr-3 text-2xl bg-black/20 p-2 rounded-xl">{message.type === 'success' ? '✅' : '⚠️'}</span>
                                <span className="font-bold text-lg">{message.text}</span>
                            </div>
                        )}

                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="animate-fade-in-up">
                                <div className="grid md:grid-cols-2 gap-8 bg-gray-900/50 p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-inner">
                                    <EditField label="Full Name" name="name" value={formData.name} onChange={handleChange} icon={<User className="text-blue-400" />} />
                                    <EditField label="Primary Email" type="email" name="email" value={formData.email} onChange={handleChange} icon={<Mail className="text-indigo-400" />} />
                                    <EditField label="Mobile Contact" name="mobile" value={formData.mobile} onChange={handleChange} icon={<Phone className="text-emerald-400" />} />
                                    <EditField label="Access Password" type="password" name="password" value={formData.password} onChange={handleChange} icon={<Shield className="text-purple-400" />} placeholder="Leave blank to maintain current" />
                                </div>
                                <div className="flex justify-end space-x-4 mt-10">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex items-center px-8 py-4 bg-gray-800 text-gray-300 border border-gray-700 rounded-2xl hover:bg-gray-700 hover:text-white transition font-bold"
                                    >
                                        <X className="h-5 w-5 mr-2" /> Discard Changes
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 transform transition font-bold"
                                    >
                                        {isSubmitting ? <Loader className="animate-spin h-5 w-5 mr-3" /> : <Save className="h-5 w-5 mr-3" />} Apply Updates
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="grid lg:grid-cols-3 gap-8 animate-slide-up delay-100">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <ProfileItem icon={<User className="text-blue-400" />} label="Registered Name" value={user.name} />
                                        <ProfileItem icon={<Mail className="text-indigo-400" />} label="Authentication Email" value={user.email} />
                                        <ProfileItem icon={<Phone className="text-emerald-400" />} label="Contact Number" value={user.mobile || 'Not Provided'} />
                                        <ProfileItem icon={<Shield className="text-purple-400" />} label="Security Clearance" value={user.role.charAt(0).toUpperCase() + user.role.slice(1)} />
                                    </div>
                                </div>

                                <div className="lg:col-span-1">
                                    <div className="bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/30 to-gray-900/80 p-8 rounded-[2rem] border border-blue-500/20 h-full shadow-inner relative overflow-hidden group/status">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover/status:bg-blue-500/20 transition duration-500 pointer-events-none"></div>

                                        <h3 className="text-xl font-bold text-white mb-8 flex items-center tracking-tight">
                                            <Shield className="h-6 w-6 mr-3 text-blue-400" /> Account Health
                                        </h3>
                                        <div className="space-y-6 relative z-10">
                                            <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
                                                <span className="text-gray-400 font-medium">System Status</span>
                                                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center shadow-inner">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse"></span> Active
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
                                                <span className="text-gray-400 font-medium">2FA Security</span>
                                                <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">Disabled</span>
                                            </div>
                                            <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
                                                <span className="text-gray-400 font-medium">Member Since</span>
                                                <span className="text-white font-bold text-lg font-mono">{new Date().getFullYear()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// eslint-disable-next-line react/prop-types
const ProfileItem = ({ icon, label, value }) => (
    <div className="flex items-center bg-gray-900/50 p-6 rounded-[2rem] border border-white/5 shadow-inner hover:bg-gray-800/80 hover:border-white/10 transition duration-300 group">
        <div className="h-14 w-14 bg-white/5 rounded-2xl flex items-center justify-center mr-5 shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div className="overflow-hidden">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-lg font-bold text-white truncate" title={value}>{value}</p>
        </div>
    </div>
);

// eslint-disable-next-line react/prop-types
const EditField = ({ label, name, value, onChange, icon, type = "text", placeholder }) => (
    <div>
        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{label}</label>
        <div className="relative group/input">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 flex items-center justify-center text-gray-500 group-focus-within/input:text-white transition-colors duration-300">
                {icon}
            </div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="pl-14 w-full p-4 bg-gray-950 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-gray-900 outline-none transition duration-300 shadow-inner text-white font-medium placeholder-gray-600"
            />
            {/* Ambient hover glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover/input:opacity-10 pointer-events-none transition-opacity duration-500"></div>
        </div>
    </div>
);

export default ProfilePage;
