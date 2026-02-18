import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Building, MapPin, Upload, Loader, CheckCircle, FileText } from 'lucide-react';

const NewApplication = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessName: '',
        businessType: 'Retail',
        address: '',
    });
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const data = new FormData();
        data.append('businessName', formData.businessName);
        data.append('businessType', formData.businessType);
        data.append('address', formData.address);

        files.forEach((file) => {
            data.append('documents', file);
        });

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        };

        try {
            await axios.post('http://localhost:5000/api/applications', data, config);
            navigate('/my-applications');
        } catch (error) {
            setError(error.response?.data?.message || 'Error submitting application');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12 px-6">
            <div className="container mx-auto max-w-4xl">


                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-8 md:p-12">
                        {error && (
                            <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 flex items-center border border-red-200">
                                <span className="mr-2">⚠️</span> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Business Info Section */}
                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                        <Building className="text-blue-600 h-5 w-5" />
                                    </div>
                                    Business Details
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                                        <input
                                            type="text"
                                            name="businessName"
                                            required
                                            className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm"
                                            placeholder="e.g. Acme Corp"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Industry Type</label>
                                        <div className="relative">
                                            <select
                                                name="businessType"
                                                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm appearance-none"
                                                value={formData.businessType}
                                                onChange={handleChange}
                                            >
                                                <option>Retail</option>
                                                <option>Manufacturing</option>
                                                <option>Services</option>
                                                <option>IT / Tech</option>
                                                <option>Healthcare</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Location Section */}
                            <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                    <div className="bg-red-100 p-2 rounded-lg mr-3">
                                        <MapPin className="text-red-600 h-5 w-5" />
                                    </div>
                                    Location
                                </h2>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Address</label>
                                    <textarea
                                        name="address"
                                        required
                                        rows="3"
                                        className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition shadow-sm"
                                        placeholder="Enter the complete business address..."
                                        value={formData.address}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Documents Section */}
                            <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                                        <FileText className="text-green-600 h-5 w-5" />
                                    </div>
                                    Required Documents
                                </h2>
                                <div className="border-2 border-dashed border-green-200 bg-white p-8 rounded-xl text-center hover:bg-green-50/30 transition cursor-pointer relative group">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        id="file-upload"
                                    />
                                    <div className="relative z-0">
                                        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                                            <Upload className="h-8 w-8" />
                                        </div>
                                        <p className="text-gray-900 font-semibold text-lg">Drop your files here</p>
                                        <p className="text-sm text-gray-500 mt-1">or click to browse from your computer</p>
                                        <p className="text-xs text-gray-400 mt-4">Supported: PDF, JPG, PNG</p>
                                    </div>
                                </div>
                                {files.length > 0 && (
                                    <div className="mt-6 space-y-2">
                                        <p className="font-semibold text-sm text-gray-700 mb-2">Attached Files:</p>
                                        {files.map((f, index) => (
                                            <div key={index} className="flex items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                                <span className="text-gray-700 font-medium text-sm">{f.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition transform flex items-center justify-center"
                            >
                                {isSubmitting ? <Loader className="animate-spin h-6 w-6" /> : "Submit Application"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewApplication;
