import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import FormControl from "../../components/auth-components/FormControl";
import Button from "../../components/Button";
import Divider from "../../components/auth-components/Divider";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000/api/v1";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/home");
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = initializeGoogleLogin;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login/`,
        { email, password },
        { withCredentials: true }
      );

      const accessToken = response.data.access_token || response.data.accessToken;
      if (!accessToken) throw new Error("No access token");

      localStorage.setItem("accessToken", accessToken);
      setEmail("");
      setPassword("");
      navigate("/home");
    } catch (err) {
      setPassword("");
      setError(err.response?.data?.error || "Login failed!");
    }
  };

  const initializeGoogleLogin = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large", width: "300" }
      );
    }
  };

  const handleGoogleLogin = async (googleResponse) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/google/callback`, {
        credential: googleResponse.credential,
      });

      localStorage.setItem("accessToken", res.data.access_token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Google login failed");
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
            <Button type="submit" className="bg-[#1B39E9] text-white hover:bg-[#1A2EB9]">
              Log In Now
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
          <Divider />
          <div id="google-login-btn" className="w-full flex justify-center"></div>
          <div className="mt-4 text-center">
            <span className="text-[#B9B9B9]">No Account Yet? </span>
            <Link to="/signup" className="text-[#1B39E9] hover:underline">
              Sign Up
            </Link>
            <span className="text-[#B9B9B9]">| </span>
            <Link to="/reset-password" className="text-[#1B39E9] hover:underline">
              Forgot Password?
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