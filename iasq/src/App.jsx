import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/Homepage";
import Quizzes from './pages/Quizzes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route (Landing page) */}
        <Route path="/" element={<LandingPage />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* Homepage */}
        <Route path="/home" element={<Homepage />} />

        {/* Quizzes page */}
        <Route path="/quizzes" element={<Quizzes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
