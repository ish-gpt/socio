import './App.css';
import Signup from './components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import Feed from './components/Feed';
import PrivateRoute from './components/PrivateRoute';
import Inbox from './components/Inbox';
import React, { useEffect } from 'react';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
          <Route path='/' element={<PrivateRoute><Feed /></PrivateRoute>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/inbox' element={<PrivateRoute><Inbox /></PrivateRoute>}></Route>
          <Route path='/inbox/:id' element={<PrivateRoute><Inbox /></PrivateRoute>}></Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
