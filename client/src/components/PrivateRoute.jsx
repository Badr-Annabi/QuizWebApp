import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import request from './requests';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [doneLoading, setDoneLoading] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await request.get("http://127.0.0.1:5000/@me")
                if (res.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch {
                // error handling
                console.log("UNAUTHERIZED");
            }
            finally {
                setDoneLoading(true);
            }
        };
        checkAuth();
    }, []);
    if (doneLoading)
        return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;