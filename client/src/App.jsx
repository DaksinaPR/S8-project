import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import NewApplication from './pages/NewApplication';
import MyApplications from './pages/MyApplications';
import Navbar from './components/Navbar';
import DashboardLayout from './layouts/DashboardLayout';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';

// Protected Route Component
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
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
              path="/my-applications"
              element={
                <ProtectedRoute>
                  <MyApplications />
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
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
