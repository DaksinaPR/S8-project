import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Building, MapPin, Wallet, FileText, Upload, ArrowLeft, ArrowRight, XCircle, CheckCircle,
    Image as ImageIcon, Loader
} from 'lucide-react';
import indiaData from '../data/statesAndDistricts.json';
import useDocumentTitle from '../hooks/useDocumentTitle';

// Document requirements by Business Type
const documentsByType = {
    "IT Company": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "incorporation", label: "Certificate of Incorporation", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "dpiit", label: "DPIIT Startup Recognition Certificate", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "stpi", label: "STPI Registration (Optional)", desc: "PDF or JPG (Max 2MB)", required: false }
    ],
    "Restaurant": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "fssai", label: "FSSAI License", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "health_trade", label: "Health Trade License", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "fire_noc", label: "Fire Safety NOC", desc: "PDF or JPG (Max 2MB)", required: true }
    ],
    "Retail": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "shop_act", label: "Shop & Establishment Act License", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "gst", label: "GST Registration Certificate", desc: "PDF or JPG (Max 2MB)", required: true }
    ],
    "Manufacturing": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "incorporation", label: "Certificate of Incorporation", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "factory_license", label: "Factory License", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "pollution_noc", label: "Pollution Control Board NOC", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "msme", label: "Udyam/MSME Registration", desc: "PDF or JPG (Max 2MB)", required: true }
    ],
    "Services": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "incorporation", label: "Certificate of Incorporation (if applicable)", desc: "PDF or JPG (Max 2MB)", required: false },
        { id: "msme", label: "Udyam/MSME Registration", desc: "PDF or JPG (Max 2MB)", required: true }
    ],
    "Healthcare": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "clinical", label: "Clinical Establishment Registration", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "medical_council", label: "Medical Council Registration", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "bio_waste", label: "Biomedical Waste Disposal Authorization", desc: "PDF or JPG (Max 2MB)", required: true }
    ],
    "Food & Beverage": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "fssai_state_central", label: "FSSAI State/Central License", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "gst", label: "GST Registration Certificate", desc: "PDF or JPG (Max 2MB)", required: true }
    ],
    "Other": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "incorporation", label: "Business Registration/Incorporation Certificate", desc: "PDF or JPG (Max 2MB)", required: true }
    ],
    "default": [
        { id: "pan", label: "PAN Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "aadhar", label: "Aadhar Card", desc: "PDF or JPG (Max 2MB)", required: true },
        { id: "incorporation", label: "Certificate of Incorporation", desc: "PDF or JPG (Max 2MB)", required: true }
    ]
};

const NewApplication = () => {
    useDocumentTitle('New Application');

    const { id } = useParams();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [rejectedFields, setRejectedFields] = useState([]);
    const [formData, setFormData] = useState({
        applicationId: `APP-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        businessName: '',
        founderName: '',
        founderEmail: '',
        businessType: '', // Still keeping for backend compatibility
        address: '', // We'll keep this as a combined string for backend submission
        addressLine1: '',
        state: '',
        city: '',
        pincode: '',
    });
    const [files, setFiles] = useState({}); // Changed to object mapping docId -> File
    const [photo, setPhoto] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [addressLoading, setAddressLoading] = useState(false);
    const [availableCities, setAvailableCities] = useState([]);
    const [error, setError] = useState('');

    const steps = [
        { id: 1, label: 'COMPANY', icon: Building },
        { id: 2, label: 'ADDRESS', icon: MapPin },
        { id: 3, label: 'DOCUMENTS', icon: FileText },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear red highlight on change
        if (rejectedFields.includes(e.target.name)) {
            setRejectedFields(rejectedFields.filter(f => f !== e.target.name));
        }
    };

    useEffect(() => {
        if (id) {
            const fetchApplication = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const { data } = await axios.get(`http://localhost:5000/api/applications/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (data) {
                        // Parse the address field back into components (simple heuristic)
                        const addressParts = data.address ? data.address.split(', ') : ['', '', ''];
                        const cityStatePin = addressParts.length > 2 ? addressParts.slice(1).join(', ') : '';

                        setFormData(prev => ({
                            ...prev,
                            applicationId: data.applicationId || prev.applicationId,
                            businessName: data.businessName,
                            businessType: data.businessType,
                            addressLine1: addressParts[0] || '', // Rough estimate for view
                        }));

                        if (data.rejectedFields) {
                            setRejectedFields(data.rejectedFields);
                        }
                    }
                } catch (err) {
                    console.error("Failed to load application", err);
                    setError("Could not load application details.");
                }
            }
            fetchApplication();
        }
    }, [id]);

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setFormData(prev => ({ ...prev, state: selectedState, city: '' }));
        // Clear red highlight if state or city was rejected
        setRejectedFields(prev => prev.filter(f => f !== 'state' && f !== 'city'));

        const stateObj = indiaData.states.find(s => s.state === selectedState);
        if (stateObj && stateObj.districts) {
            setAvailableCities(stateObj.districts);
        } else {
            setAvailableCities([]);
        }
    };

    const handlePincodeChange = async (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, pincode: value }));

        // Indian pincodes are exactly 6 digits
        if (value.length === 6 && /^\d+$/.test(value)) {
            setAddressLoading(true);
            try {
                // Using the free Indian Post Office API
                const response = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
                if (response.data[0].Status === "Success") {
                    const postOffices = response.data[0].PostOffice;

                    // Extract unique district names for the city dropdown
                    const uniqueCities = [...new Set(postOffices.map(po => po.District))];

                    setAvailableCities(uniqueCities);

                    setFormData(prev => ({
                        ...prev,
                        state: postOffices[0].State,
                        city: uniqueCities.length === 1 ? uniqueCities[0] : '' // Auto-select if only 1 city, else make user choose
                    }));
                } else {
                    // Reset if invalid pincode
                    setAvailableCities([]);
                    setFormData(prev => ({ ...prev, city: '', state: '' }));
                }
            } catch (err) {
                console.error("Error fetching pincode details:", err);
                setAvailableCities([]);
            } finally {
                setAddressLoading(false);
            }
        }
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleFileChange = (e, docId) => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({ ...prev, [docId]: e.target.files[0] }));
        }
    };

    const removeFile = (docId) => {
        setFiles(prev => {
            const newFiles = { ...prev };
            delete newFiles[docId];
            return newFiles;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If not on last step, just move forward
        if (currentStep < 3) {
            setCurrentStep(prev => prev + 1);
            return;
        }

        setIsSubmitting(true);
        setError('');

        const data = new FormData();
        data.append('applicationId', formData.applicationId);
        data.append('businessName', formData.businessName);
        data.append('businessType', formData.businessType);

        // Combine address for backend
        const fullAddress = `${formData.addressLine1}, ${formData.city}, ${formData.state} - ${formData.pincode}`;
        data.append('address', fullAddress);

        // Add new fields
        data.append('founderEmail', formData.founderEmail);

        // We append photo as document for now to save it without schema changes
        if (photo) {
            data.append('documents', photo);
        }
        Object.values(files).forEach((file) => {
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
            const response = await axios.post('http://localhost:5000/api/applications', data, config);
            // Redirect to dashboard/my applications instead of AI validation
            navigate('/my-applications');
        } catch (error) {
            setError(error.response?.data?.message || 'Error submitting application');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen pt-4 pb-12 w-full animate-fade-in text-white group">
            <div className="max-w-6xl mx-auto">

                {/* Back Button */}
                <div className="mb-6">
                    <Link to="/dashboard" className="inline-flex items-center text-gray-400 hover:text-white font-semibold transition group-hover:drop-shadow-lg">
                        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Dashboard
                    </Link>
                </div>

                {/* Stepper */}
                <div className="flex justify-between items-center mb-8 px-2 md:px-12 relative z-10">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 rounded-full"></div>

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isPast = currentStep > step.id;

                        return (
                            <div key={step.id} className="flex flex-col items-center cursor-pointer relative z-10" onClick={() => setCurrentStep(step.id)}>
                                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 border
                                    ${isActive ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-110 border-transparent' :
                                        isPast ? 'bg-blue-600/30 text-blue-400 border-blue-500/30 shadow-inner backdrop-blur-md' : 'bg-gray-900/50 text-gray-500 border-white/10 backdrop-blur-md'}`}>
                                    <Icon className="h-7 w-7" />
                                </div>
                                <span className={`text-xs font-bold tracking-widest uppercase bg-gray-900 px-2 rounded-full ${isActive ? 'text-blue-400 shadow-sm' : 'text-gray-500'}`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Form Container */}
                <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 p-8 md:p-12 mb-8 min-h-[500px] relative overflow-hidden">
                    {/* Decorative glow inside card */}
                    <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none"></div>

                    <form onSubmit={handleSubmit} className="relative z-10">

                        {error && (
                            <div className="bg-red-500/10 text-red-300 p-4 rounded-2xl mb-8 flex items-center border border-red-500/30 font-medium">
                                <span className="mr-3 p-1 bg-red-500/20 rounded-lg">⚠️</span> {error}
                            </div>
                        )}

                        {/* STEP 1: COMPANY */}
                        {currentStep === 1 && (
                            <div className="flex flex-col lg:flex-row gap-12 animate-slide-up">
                                {/* Left Fields */}
                                <div className="flex-1 space-y-6">
                                    <div className="group">
                                        <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">Application ID</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="applicationId"
                                                className="w-full p-4 bg-gray-900/50 border border-white/10 rounded-2xl focus:outline-none text-blue-400 font-mono tracking-widest font-extrabold shadow-inner"
                                                value={formData.applicationId}
                                                readOnly
                                            />
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                                <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] px-3 py-1.5 rounded-xl font-extrabold uppercase tracking-widest shadow-inner">Auto-Generated</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">Business Type *</label>
                                            <div className="relative">
                                                <select
                                                    name="businessType"
                                                    className="w-full p-4 bg-gray-900/50 border border-white/10 rounded-2xl focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition appearance-none text-white font-medium shadow-inner [&>option]:bg-gray-900"
                                                    value={formData.businessType}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="" disabled className="text-gray-500">Select Business Type</option>
                                                    <option value="IT Company">IT Company</option>
                                                    <option value="Restaurant">Restaurant</option>
                                                    <option value="Retail">Retail</option>
                                                    <option value="Manufacturing">Manufacturing</option>
                                                    <option value="Services">Services</option>
                                                    <option value="Healthcare">Healthcare</option>
                                                    <option value="Food & Beverage">Food & Beverage</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">Company Name *</label>
                                            <input
                                                type="text"
                                                name="businessName"
                                                className="w-full p-4 bg-gray-900/50 border border-white/10 rounded-2xl focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition font-medium text-white shadow-inner placeholder-gray-600"
                                                placeholder="Enter full legal name"
                                                value={formData.businessName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">Founder Name *</label>
                                            <input
                                                type="text"
                                                name="founderName"
                                                className="w-full p-4 bg-gray-900/50 border border-white/10 rounded-2xl focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition font-medium text-white shadow-inner placeholder-gray-600"
                                                placeholder="Full name of primary director"
                                                value={formData.founderName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">Founder Email *</label>
                                            <input
                                                type="email"
                                                name="founderEmail"
                                                className="w-full p-4 bg-gray-900/50 border border-white/10 rounded-2xl focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition font-medium text-white shadow-inner placeholder-gray-600"
                                                placeholder="official@company.com"
                                                value={formData.founderEmail}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Field: Photo Upload */}
                                <div className="w-full lg:w-80">
                                    <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase text-center lg:text-left">Owner&apos;s Photo *</label>
                                    <div className="border border-dashed border-white/20 bg-gray-900/50 hover:bg-gray-800/80 transition duration-300 rounded-[2.5rem] p-8 text-center flex flex-col items-center justify-center h-64 relative cursor-pointer group shadow-inner">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={handlePhotoChange}
                                            required={!photo}
                                        />
                                        {photo ? (
                                            <div className="w-full h-full rounded-3xl overflow-hidden bg-gray-900 flex items-center justify-center p-2 relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                                                <img src={URL.createObjectURL(photo)} alt="Preview" className="object-cover h-full w-full rounded-2xl" />
                                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-3xl z-20 backdrop-blur-sm">
                                                    <Upload className="h-8 w-8 text-white mb-3 shadow-lg" />
                                                    <span className="text-white text-sm font-bold uppercase tracking-widest">Change Photo</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="h-16 w-16 bg-white/5 rounded-2xl shadow-lg border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition duration-300">
                                                    <Upload className="h-8 w-8 text-blue-400 group-hover:text-blue-300" />
                                                </div>
                                                <p className="text-base font-bold text-blue-400 mb-2 group-hover:text-blue-300">Upload Photo</p>
                                                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold flex items-center leading-relaxed">
                                                    Clear Face <br /> JPG/PNG (150KB)
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: ADDRESS */}
                        {currentStep === 2 && (
                            <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Business Location</h2>
                                    <p className="text-gray-400 mt-3 font-medium text-lg">Where is your primary operations hub registered?</p>
                                </div>

                                <div className="space-y-6 bg-gray-900/30 p-8 rounded-[2rem] border border-white/5 shadow-inner">
                                    {/* Line 1: State */}
                                    <div className="w-full md:w-1/2">
                                        <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">State *</label>
                                        <select
                                            name="state"
                                            className="w-full p-4 bg-gray-900/50 border border-white/10 rounded-2xl focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition appearance-none text-white font-medium shadow-inner [&>option]:bg-gray-900"
                                            value={formData.state}
                                            onChange={handleStateChange}
                                            required
                                        >
                                            <option value="" disabled className="text-gray-500">Select State</option>
                                            {indiaData.states.map((s) => (
                                                <option key={s.state} value={s.state}>{s.state}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Line 2: City & Pincode */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">City / District *</label>
                                            {availableCities.length > 0 ? (
                                                <select
                                                    name="city"
                                                    className="w-full p-4 bg-gray-900/50 border border-white/10 rounded-2xl focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition appearance-none text-white font-medium shadow-inner [&>option]:bg-gray-900"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="" disabled className="text-gray-500">Select City</option>
                                                    {availableCities.map(city => (
                                                        <option key={city} value={city}>{city}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type="text"
                                                    name="city"
                                                    className="w-full p-4 bg-gray-900/50 border border-white/10 rounded-2xl focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition text-white font-medium shadow-inner placeholder-gray-600"
                                                    placeholder="Enter city (or use Pincode)"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">Pincode *</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="pincode"
                                                    maxLength="6"
                                                    className="w-full p-4 bg-gray-900/50 border border-white/10 rounded-2xl focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition pr-12 text-white font-medium shadow-inner placeholder-gray-600"
                                                    placeholder="e.g. 560001"
                                                    value={formData.pincode}
                                                    onChange={handlePincodeChange}
                                                    required
                                                />
                                                {addressLoading && (
                                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                                        <Loader className="h-5 w-5 text-blue-500 animate-spin" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Line 3: Registered Address */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">Registered Address *</label>
                                        <textarea
                                            name="addressLine1"
                                            rows="3"
                                            className="w-full p-4 bg-gray-900/50 border border-white/10 rounded-2xl focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition text-white font-medium shadow-inner placeholder-gray-600"
                                            placeholder="Flat, House No, Building, Street..."
                                            value={formData.addressLine1}
                                            onChange={handleChange}
                                            required={currentStep === 2 || currentStep === 3}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: DOCUMENTS */}
                        {currentStep === 3 && (
                            <div className="w-full animate-slide-up">
                                <div className="mb-10 text-center">
                                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Required Documents</h2>
                                    <p className="text-gray-400 mt-3 font-medium text-lg">
                                        Upload official files for <span className="font-bold text-blue-400 border-b border-blue-400/30 pb-0.5">{formData.businessType || 'your business'}</span>.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {(documentsByType[formData.businessType] || documentsByType["default"]).map((doc) => {
                                        const file = files[doc.id];
                                        return (
                                            <div key={doc.id} className={`relative group flex flex-col border rounded-2xl p-6 transition-all duration-300 shadow-sm
                                                ${file ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]' : 'border-white/10 hover:border-blue-500/50 bg-gray-900/50 hover:bg-gray-800/80 shadow-inner'}`}>
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="font-bold text-white text-base tracking-tight mb-1">{doc.label}</h3>
                                                        {!doc.required && <span className="text-[10px] bg-white/10 text-gray-300 border border-white/20 px-2.5 py-1 rounded-full uppercase font-bold tracking-widest inline-block shadow-sm backdrop-blur-md">Optional</span>}
                                                    </div>
                                                    {file ? (
                                                        <div className="h-10 w-10 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                                                            <CheckCircle className="w-6 h-6" />
                                                        </div>
                                                    ) : (
                                                        <div className="h-10 w-10 bg-white/5 text-gray-500 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all shadow-inner">
                                                            <FileText className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>

                                                <p className="text-xs text-gray-500 mb-6 flex-grow font-medium leading-relaxed">{doc.desc}</p>

                                                {file ? (
                                                    <div className="mt-auto bg-gray-900 rounded-xl p-3 border border-white/5 flex items-center justify-between shadow-inner">
                                                        <div className="flex items-center overflow-hidden mr-3">
                                                            <ImageIcon className="w-5 h-5 text-blue-400 mr-3 shrink-0" />
                                                            <span className="text-sm font-semibold text-gray-300 truncate">{file.name}</span>
                                                        </div>
                                                        <button type="button" onClick={() => removeFile(doc.id)} className="text-gray-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg transition shrink-0 p-2 border border-transparent hover:border-red-500/20">
                                                            <XCircle className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="relative mt-auto">
                                                        <input
                                                            type="file"
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                            onChange={(e) => handleFileChange(e, doc.id)}
                                                            title={`Upload ${doc.label}`}
                                                            required={doc.required}
                                                        />
                                                        <button type="button" className="w-full py-3.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl group-hover:border-blue-500/50 group-hover:bg-blue-600 group-hover:text-white font-bold text-sm transition-all shadow-md flex items-center justify-center overflow-hidden relative">
                                                            <Upload className="w-4 h-4 mr-2" /> Select File
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center relative z-10">
                            {currentStep > 1 ? (
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(prev => prev - 1)}
                                    className="px-8 py-4 text-gray-400 font-bold hover:bg-white/5 hover:text-white rounded-2xl transition border border-transparent hover:border-white/10"
                                >
                                    &larr; Previous step
                                </button>
                            ) : (
                                <div></div> // placeholder to keep Save/Next on right
                            )}

                            <div className="flex space-x-4">
                                <button type="button" className="px-8 py-4 text-gray-400 font-bold hover:bg-white/5 rounded-2xl transition border border-white/5 hover:border-white/20 backdrop-blur-md hidden sm:block">
                                    Save Draft
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:from-blue-500 hover:to-purple-500 hover:-translate-y-1 transition transform flex items-center border border-transparent
                                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? <Loader className="animate-spin h-5 w-5 mr-3" /> : null}
                                    {currentStep === 3 ? 'Finalize & Submit' : 'Continue to next'}
                                    {currentStep < 3 && <ArrowRight className="w-5 h-5 ml-2" />}
                                </button>
                            </div>
                        </div>

                    </form>
                </div>

            </div >
        </div >
    );
};

export default NewApplication;
