/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${token}` },
                    };
                    const { data } = await axios.get('http://localhost:5000/api/auth/me', config);
                    setUser(data);
                } catch (error) {
                    console.error("Auth check failed:", error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            setUser(data);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (formData) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('token', data.token);
            setUser(data);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const updateProfile = async (userData) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const { data } = await axios.put('http://localhost:5000/api/auth/profile', userData, config);
            localStorage.setItem('token', data.token); // Token might be same, but good practice if I rotate it
            setUser(data);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Update failed' };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
