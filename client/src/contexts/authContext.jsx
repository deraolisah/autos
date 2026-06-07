// contexts/authContext.jsx (note: lowercase 'a')
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        if (token) {
            verifyToken();
        } else {
            setLoading(false);
        }
    }, []);

    
    const verifyToken = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.data.user) {
                setUser(response.data.user);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Token verification failed", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = (newToken, userData) => {
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
        setUser(userData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    // Check if Admin
    const isAdmin = () => {
        user?.role === "admin";
    }

    // Return the value directly (not nested)
    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        token
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};