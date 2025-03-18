import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";
import FormControl from "../components/FormControl";
import Button from "../components/Button";
import Divider from "../components/Divider";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Download Google Identity Services Library
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = initializeGoogleLogin;
    document.body.appendChild(script);
  }, []);

  // Traditional login function
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://your-api.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed!");

    // Store Access Token in localStorage
      localStorage.setItem("accessToken", data.accessToken);

      // Redirect to the home page
      navigate("/Quizzes");
    } catch (err) {
      setError(err.message);
    }
  };

  // Initialize Google Login
  const initializeGoogleLogin = () => {
    window.google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID", // Your Google Client ID
      callback: handleGoogleLogin,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-login-btn"),
      { theme: "outline", size: "large" }
    );
  };

  // Google login function
  const handleGoogleLogin = async (response) => {
    try {
      const googleToken = response.credential; // Google ID Token
      const res = await fetch("https://your-api.com/api/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google login failed!");

      // Store Access Token in localStorage
      localStorage.setItem("accessToken", data.accessToken);

      // Redirect to the home page
      navigate("/Quizzes");
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="grid grid-cols-[57%_43%] min-h-screen">
      <div className="flex items-center justify-center px-[100px] py-[120px]">
        <div className="w-full">
          <div className="mb-[20px]">
            <h2 className="font-medium text-[28px]">IASQ</h2>
            <p className="text-[#B9B9B9] text-[19px]">
              Let's start the era of success and productivity
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <FormControl
              label="Email address"
              id="email"
              type="email"
              placeholder="Name@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

              <Button
                type="submit"
                className="bg-[#1B39E9] text-white hover:bg-[#1A2EB9]"
              >
              Log In Now
              </Button>

            {error && <p className="text-red-500">{error}</p>}
          </form>
          <Divider />
          <Button onClick={handleGoogleLogin}
            className="text-[#3B4043] border-[0.5px] border-solid border-[#D4D4D4] hover:bg-gray-100"
            icon="/img/flat-color-icons_google.svg"
          >
            Continue with Google
          </Button>
          <div className="mt-4 text-center">
            <span className="text-[#B9B9B9]">No Account Yet? </span>
            <Link to="/signup" className="text-[#1B39E9] hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className="relative">
        <img
          src="/img/login.png"
          alt="Login"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
