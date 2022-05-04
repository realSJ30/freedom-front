import jsCookie from 'js-cookie';
import React from 'react'
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({ children }) => {

    // check cookie if is authenticated
    const isAuthenticated = jsCookie.get('isAuthenticated');    

    return (
        isAuthenticated === 'true' ? children : <Navigate to={{ pathname: '/login' }} />
    )
}

export default ProtectedRoute
