import { useState } from 'react';
import { Award, Building, Download, Upload, ArrowRight } from 'lucide-react';
import { documentsByType } from '../utils/constants';
import useDocumentTitle from '../hooks/useDocumentTitle';

const GetCertification = () => {
    useDocumentTitle('Get Certifications');

    const [selectedCategory, setSelectedCategory] = useState('');

    const businessCategories = Object.keys(documentsByType).filter(k => k !== 'default');

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const requiredCerts = selectedCategory ? documentsByType[selectedCategory] : [];

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-8 pb-12 px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                        <Award className="h-8 w-8 text-blue-600 mr-3" />
                        Get Certifications
                    </h1>
                    <p className="text-gray-500 mt-2">Discover and apply for the specific certifications required for your business type.</p>
                </div>

                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12 mb-8">
                    <div className="max-w-xl mb-10">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Select Your Business Category</label>
                        <div className="relative">
                            <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <select
                                className="w-full pl-12 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition appearance-none font-medium text-gray-700"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="" disabled>Choose a category...</option>
                                {businessCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {selectedCategory && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
                                Required Certifications for {selectedCategory}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {requiredCerts.map((cert) => (
                                    <div key={cert.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                                <Award className="h-6 w-6" />
                                            </div>
                                            {!cert.required && (
                                                <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-widest">
                                                    Optional
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-bold text-gray-800 text-lg mb-2">{cert.label}</h3>
                                        <p className="text-sm text-gray-500 mb-6 flex-grow">
                                            Apply for or upload your {cert.label} to ensure compliance.
                                        </p>

                                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition duration-300 font-bold group-hover:shadow-md">
                                            <span>Get Certificate</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GetCertification;
