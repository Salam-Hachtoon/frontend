<<<<<<< HEAD
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
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Quizzes from './pages/Quizzes';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route (Login page) */}
        <Route path="/" element={<Signup />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Signup page */}

        {/* Quizzes page */}
        <Route path="/Quizzes" element={<Quizzes/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
>>>>>>> ce67c39 (handle signup and login functions)
