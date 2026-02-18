import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { User, Mail, Phone, Shield, LogOut, Edit2, Save, X, Loader } from 'lucide-react';

const ProfilePage = () => {
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

    if (!user) return <div className="p-10 text-center">Loading...</div>;

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
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
            <div className="container mx-auto max-w-5xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 md:h-48 relative">
                        <div className="absolute top-0 left-0 w-full h-full opacity-20">
                            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white blur-xl"></div>
                            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-blue-300 blur-xl"></div>
                        </div>
                    </div>

                    <div className="px-8 pb-8 relative">
                        {/* Avatar & Actions */}
                        <div className="flex flex-col md:flex-row justify-between items-end -mt-12 mb-8 relative z-10">
                            <div className="flex items-end">
                                <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="ml-6 mb-2 hidden md:block">
                                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                                    <p className="text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex space-x-3 mt-4 md:mt-0">
                                {!isEditing && (
                                    <button
                                        onClick={startEditing}
                                        className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition shadow-sm font-medium"
                                    >
                                        <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
                                    </button>
                                )}
                                <button
                                    onClick={logout}
                                    className="flex items-center px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition shadow-sm font-medium"
                                >
                                    <LogOut className="h-4 w-4 mr-2" /> Logout
                                </button>
                            </div>
                        </div>

                        {/* Mobile Name (Visible only on small screens) */}
                        <div className="md:hidden mb-8 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                            <p className="text-gray-500">{user.email}</p>
                        </div>

                        {message.text && (
                            <div className={`p-4 rounded-xl mb-6 flex items-center shadow-sm border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                <span className="mr-2 text-xl">{message.type === 'success' ? '✅' : '⚠️'}</span> {message.text}
                            </div>
                        )}

                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="animate-fade-in-up">
                                <div className="grid md:grid-cols-2 gap-8 bg-gray-50/50 p-8 rounded-2xl border border-gray-200">
                                    <EditField label="Full Name" name="name" value={formData.name} onChange={handleChange} icon={<User className="text-blue-500" />} />
                                    <EditField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} icon={<Mail className="text-indigo-500" />} />
                                    <EditField label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} icon={<Phone className="text-green-500" />} />
                                    <EditField label="New Password (Optional)" type="password" name="password" value={formData.password} onChange={handleChange} icon={<Shield className="text-purple-500" />} placeholder="Leave blank to keep current" />
                                </div>
                                <div className="flex justify-end space-x-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex items-center px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold"
                                    >
                                        <X className="h-5 w-5 mr-2" /> Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-lg transition font-semibold"
                                    >
                                        {isSubmitting ? <Loader className="animate-spin h-5 w-5 mr-2" /> : <Save className="h-5 w-5 mr-2" />} Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <ProfileItem icon={<User className="text-blue-500" />} label="Full Name" value={user.name} />
                                        <ProfileItem icon={<Mail className="text-indigo-500" />} label="Email Address" value={user.email} />
                                        <ProfileItem icon={<Phone className="text-green-500" />} label="Mobile Number" value={user.mobile || 'N/A'} />
                                        <ProfileItem icon={<Shield className="text-purple-500" />} label="Account Role" value={user.role.charAt(0).toUpperCase() + user.role.slice(1)} />
                                    </div>
                                </div>

                                <div className="md:col-span-1">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 h-full">
                                        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                                            <Shield className="h-5 w-5 mr-2" /> Account Status
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Status</span>
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Active</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Verified</span>
                                                <span className="text-green-600 font-bold">Yes</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Member Since</span>
                                                <span className="text-gray-800 font-medium">{new Date().getFullYear()}</span>
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
    <div className="flex items-center bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition duration-200">
        <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-lg font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

// eslint-disable-next-line react/prop-types
const EditField = ({ label, name, value, onChange, icon, type = "text", placeholder }) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
        <div className="relative group">
            <div className="absolute left-3 top-3.5 h-5 w-5 flex items-center justify-center text-gray-400 group-focus-within:text-blue-500 transition">
                {icon}
            </div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="pl-12 w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm"
            />
        </div>
    </div>
);

export default ProfilePage;
