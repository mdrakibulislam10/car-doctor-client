// import React from 'react';

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location);

    if (loading) {
        return <progress className="progress progress-accent w-56" value="70" max="100"></progress>
    }

    if (user?.email) {
        return children;
    }

    return <Navigate to={"/login"} state={{ from: location }} replace />
};

export default PrivateRoutes;