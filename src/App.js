import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {
  const { authIsReady, user } = useAuthContext()
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
      )}

    </div>
  );
}

export default App
