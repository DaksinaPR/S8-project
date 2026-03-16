import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import NewApplication from './pages/NewApplication';
import MyApplications from './pages/MyApplications';
import AiValidationPage from './pages/AiValidationPage';
import Notifications from './pages/Notifications';
import GetCertification from './pages/GetCertification';
import OfficerCertifications from './pages/OfficerCertifications';
import Navbar from './components/Navbar';
import DashboardLayout from './layouts/DashboardLayout';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Protected Route Component
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<><Navbar /><LandingPage /></>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes with Sidebar Layout */}
            <Route element={<DashboardLayout />}>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/apply"
                element={
                  <ProtectedRoute>
                    <NewApplication />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/application/:id"
                element={
                  <ProtectedRoute>
                    <NewApplication />
                  </ProtectedRoute>
                }
              />
              <Route path="/application/:id/validation" element={
                <ProtectedRoute>
                  <AiValidationPage />
                </ProtectedRoute>
              } />
              <Route
                path="/my-applications"
                element={
                  <ProtectedRoute>
                    <MyApplications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/certifications"
                element={
                  <ProtectedRoute>
                    <GetCertification />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/requested-certifications"
                element={
                  <ProtectedRoute>
                    <OfficerCertifications title="Requested Certifications" statusFilter="Pending" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/approved-certifications"
                element={
                  <ProtectedRoute>
                    <OfficerCertifications title="Approved Certifications" statusFilter="Approved" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rejected-certifications"
                element={
                  <ProtectedRoute>
                    <OfficerCertifications title="Rejected Certifications" statusFilter="Rejected" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
