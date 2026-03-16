import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
  User,
  Mail,
  Lock,
  Phone,
  Briefcase,
  Loader,
  Building,
  ArrowLeft,
} from "lucide-react";
import loginBg from '../assets/login_bg.png';
import useDocumentTitle from '../hooks/useDocumentTitle';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "entrepreneur",
    companyId: "",
    officerCategory: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [publicData, setPublicData] = useState({
    states: [],
    citiesByState: {},
    companies: [],
  });
  const [selectedState, setSelectedState] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [availableCompanies, setAvailableCompanies] = useState([]);
  const [companySearchText, setCompanySearchText] = useState("");

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/public/data",
        );
        setPublicData(data);
      } catch (err) {
        console.error(
          "Failed to fetch public data for officer registration",
          err,
        );
      }
    };
    fetchPublicData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setAvailableCities(publicData.citiesByState[state] || []);
    setSelectedCity("");
    setAvailableCompanies([]);
    setCompanySearchText("");
    setFormData({ ...formData, companyId: "" });
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setAvailableCompanies(
      publicData.companies.filter(
        (c) => c.state === selectedState && c.city === city,
      ),
    );
    setCompanySearchText("");
    setFormData({ ...formData, companyId: "" });
  };

  const handleCompanySearchChange = (e) => {
    const txt = e.target.value;
    setCompanySearchText(txt);
    const matchedCompany = availableCompanies.find(
      (c) => c.businessName === txt,
    );
    if (matchedCompany) {
      setFormData({ ...formData, companyId: matchedCompany._id });
    } else {
      setFormData({ ...formData, companyId: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const dataToSubmit = new FormData();
    dataToSubmit.append("name", formData.name);
    dataToSubmit.append("email", formData.email);
    dataToSubmit.append("password", formData.password);
    dataToSubmit.append("mobile", formData.mobile);
    dataToSubmit.append("role", formData.role);

    if (formData.role === "entrepreneur") {
      if (selectedState) dataToSubmit.append("state", selectedState);
      if (formData.city) dataToSubmit.append("city", formData.city);
    }
    if (formData.role === "officer") {
      dataToSubmit.append("officerCategory", formData.officerCategory);
    }
    if (formData.role === "entrepreneur" && formData.companyId) {
      dataToSubmit.append("companyName", formData.companyId); // we saved the custom name under companyId in the input logic
      if (formData.certificate) {
        dataToSubmit.append("certificate", formData.certificate);
      }
    }

    const res = await register(dataToSubmit);

    setIsSubmitting(false);
    if (res.success) {
      navigate("/profile");
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 relative">
      {/* Left Half - Image (Fixed/Sticky) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 lg:h-screen lg:sticky lg:top-0">
        <img
          src={loginBg}
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Half - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start items-center pt-8 pb-4 px-4 sm:pt-10 sm:pb-6 sm:px-8 md:pt-12 md:pb-8 md:px-12 lg:pt-12 lg:pb-8 lg:px-16 bg-white relative min-h-screen">
        <div className="w-full max-w-xl animate-slide-up">
          <div
            className={`bg-white p-5 sm:p-6 md:px-8 md:pt-8 md:pb-6 w-full ${formData.role === "entrepreneur" ? "max-w-xl" : "max-w-sm mx-auto"} rounded-2xl transition-all duration-300`}
          >
            <div className="text-center mb-6 lg:mb-8">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/30 mb-5">
                <User className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Create Account</h2>
              <p className="text-gray-500 mt-2 text-sm">Join the unified government approval platform.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-center">
                <div className="h-2 w-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div
                className={`grid grid-cols-1 ${formData.role === "entrepreneur" ? "md:grid-cols-2 gap-6" : "gap-3"}`}
              >
                {/* Left Column: Personal Info (or full width if not entrepreneur) */}
                <div className="space-y-3">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all font-medium text-sm"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all font-medium text-sm"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      required
                      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all font-medium text-sm"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="mobile"
                      required
                      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all font-medium text-sm"
                      placeholder="Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>

                  {formData.role === "officer" && (
                    <div className="relative mt-3 group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                      </div>
                      <select
                        name="officerCategory"
                        required
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all font-medium appearance-none text-sm"
                        value={formData.officerCategory}
                        onChange={handleChange}
                      >
                        <option value="" disabled className="text-gray-400">Select Officer Category</option>
                        <option value="Food & Safety">Food & Safety</option>
                        <option value="Health">Health</option>
                        <option value="Environment">Environment</option>
                        <option value="Fire Safety">Fire Safety</option>
                        <option value="Labor">Labor</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  )}
                </div>{" "}
                {/* End Left Column */}
                {formData.role === "entrepreneur" && (
                  <div className="h-full flex flex-col justify-start">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          list="stateList"
                          placeholder="Search State..."
                          className="w-full px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all font-medium"
                          value={selectedState}
                          onChange={handleStateChange}
                          required={formData.role === "entrepreneur"}
                          autoComplete="off"
                        />
                        <datalist id="stateList">
                          {publicData.states.map((s) => (
                            <option key={s} value={s} />
                          ))}
                        </datalist>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          className="w-full px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all font-medium"
                          value={selectedCity}
                          onChange={(e) => {
                            setSelectedCity(e.target.value);
                            setFormData({ ...formData, city: e.target.value });
                          }}
                          required={formData.role === "entrepreneur"}
                          autoComplete="off"
                        />
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          name="companyName"
                          placeholder="Company Name"
                          className="w-full px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all font-medium"
                          value={companySearchText}
                          onChange={(e) => {
                            setCompanySearchText(e.target.value);
                            setFormData({ ...formData, companyId: e.target.value });
                          }}
                          required={formData.role === "entrepreneur"}
                          autoComplete="off"
                        />
                      </div>

                      {formData.role === "entrepreneur" && (
                        <div className="relative group">
                          <p className="text-sm font-medium text-gray-500 mb-2 ml-1">
                            Upload Certificate
                          </p>
                          <input
                            type="file"
                            name="certificate"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/50"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                certificate: e.target.files[0],
                              })
                            }
                            required={formData.role === "entrepreneur"}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>{" "}
              {/* End Grid */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-500 mb-2 ml-1">
                  Select your role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "client" })}
                    className={`p-2 border rounded-xl flex flex-col items-center justify-center text-xs md:text-sm font-semibold transition-all duration-200 ${formData.role === "client" ? "bg-blue-50 border-blue-600 text-blue-700 ring-1 ring-blue-600" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"}`}
                  >
                    <User className={`h-5 w-5 mb-1 ${formData.role === "client" ? "text-blue-600" : "text-gray-400"}`} />
                    Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "officer" })}
                    className={`p-2 border rounded-xl flex flex-col items-center justify-center text-xs md:text-sm font-semibold transition-all duration-200 ${formData.role === "officer" ? "bg-purple-50 border-purple-600 text-purple-700 ring-1 ring-purple-600" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"}`}
                  >
                    <Building className={`h-5 w-5 mb-1 ${formData.role === "officer" ? "text-purple-600" : "text-gray-400"}`} />
                    Officer
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, role: "entrepreneur" })
                    }
                    className={`p-2 border rounded-xl flex flex-col items-center justify-center text-xs md:text-sm font-semibold transition-all duration-200 ${formData.role === "entrepreneur" ? "bg-indigo-50 border-indigo-600 text-indigo-700 ring-1 ring-indigo-600" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"}`}
                  >
                    <Briefcase className={`h-5 w-5 mb-1 ${formData.role === "entrepreneur" ? "text-indigo-600" : "text-gray-400"}`} />
                    Company
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-700 transform transition hover:-translate-y-0.5 mt-3 flex justify-center items-center
              ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                ) : null}
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-4 text-center text-gray-600 text-sm font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-gray-900 hover:text-blue-600 font-bold transition-colors underline decoration-gray-300 hover:decoration-blue-600/50 underline-offset-4"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
