import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/Homepage";
import Quizzes from "./pages/features/Quizzes";
import ResetPassword from "./pages/authentication/ResetPassword";
import QuizPage from "./pages/features/QuizPage";
import Summaries from "./pages/features/Summaries"
import FlashcardSets from "./pages/features/FlashcardSets";

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

        {/* Rest Password page */}
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/home" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="quizpage" element={<QuizPage />} />
          <Route path="summaries" element={<Summaries />} />
          <Route path="/home/flashcards" element={<FlashcardSets />} />
          {/*<Route path="Summaries" element={<Summaries />} />*/}
          {/*<Route path="Settings" element={<Settings />} />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
