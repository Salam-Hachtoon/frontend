import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />;
      <Route path="/Login" element={<Login/>} />;
      <Route path="/Signup" element={<Signup/>} />;
      <Route path='/Home' element={<Homepage/>} />;
    </Routes>
  );
}

export default App;
