"use client";
// authContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de importar correctamente desde next/navigation

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter(); // Asegúrate de que useRouter esté importado correctamente

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Error parsing user data from localStorage:", error);
                    localStorage.removeItem('user');
                }
            }
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        if (typeof window !== 'undefined') {
            router.push('/servicios');
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        if (typeof window !== 'undefined') {
            router.push('/');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
  };
