import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoute(props) {
    const {user} = useContext(AuthContext);
  return (
      user ? props.children : <Navigate to='/login'/>
  )
}
