import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import Feed from './components/Feed';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
          <Route path='/' element={<PrivateRoute><Feed /></PrivateRoute>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
