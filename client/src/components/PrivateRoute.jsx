import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext, createContext } from 'react';
import request from './requests';

const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};


const PrivateRoute = ({ children, accessible=true }) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [doneLoading, setDoneLoading] = useState(false);
    const [user, setUser] = useState(null);

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await request.get("http://127.0.0.1:5000/@me")
                if (res.status === 200) {
                    setUser(res.data.user)
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch {
                console.log("UNAUTHERIZED");
            }
            finally {
                setDoneLoading(true);
            }
        };
        checkAuth();
    }, []);
    if (!doneLoading) return null; // Blank screen during loading

    if (accessible) {
        return (
            <AuthContext.Provider value={{ user, logout }}>
                {children}
            </AuthContext.Provider>
        )
    }

    return (
        isAuthenticated ? (
            <AuthContext.Provider value={{ user }}>
                {children}
            </AuthContext.Provider>
        ) : (
            <Navigate to="/login" />
        )
    );
};

export default PrivateRoute;