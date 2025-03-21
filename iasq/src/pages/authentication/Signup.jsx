import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import FormControl from "../../components/auth-components/FormControl";
import Button from "../../components/Button";
import Divider from "../../components/auth-components/Divider";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log("Sending Data:", { email, firstName, lastName, password });
  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/home");
    }
  }, [navigate]);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidName = (name) => {
    return /^[a-zA-Z\-']{2,}$/.test(name);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Validation checks
    let errors = [];
    if (!isValidEmail(email)) errors.push("Valid email required");
    if (password.length < 6) errors.push("Password must be at least 6 characters");
    if (!firstName.trim() || !lastName.trim()) errors.push("Full name required");
    if (!isValidName(firstName) || !isValidName(lastName)) {
      errors.push("Names should contain only letters and hyphens");
    }

    if (errors.length > 0) {
      setError(errors.join(". "));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/signup/`, {
        email,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        password,
      });

      const { access_token, accessToken, refresh_token, refreshToken } = response.data;
      const access = access_token || accessToken;
      const refresh = refresh_token || refreshToken;

      if (access) {
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh || "");
        navigate("/home");
      } else {
        navigate("/login", { 
          state: { 
            message: "Signup successful! Please verify your email",
            email 
          } 
        });
      }
    } catch (err) {
      let errorMessage = "Signup failed. Please try again";
      if (err.response) {
        const serverError = err.response.data;
        errorMessage = serverError?.error || 
                      serverError?.message || 
                      serverError?.detail || 
                      errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google?redirect_uri=${window.location.origin}/oauth-redirect`;
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
          
          <form onSubmit={handleSignup}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <FormControl
              label="Email address"
              id="email"
              type="email"
              placeholder="Name@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormControl
                label="First Name"
                id="first-name"
                type="text"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value.trim())}
                pattern="^[a-zA-Z\-']+$"
              />
              <FormControl
                label="Last Name"
                id="last-name"
                type="text"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value.trim())}
                pattern="^[a-zA-Z\-']+$"
              />
            </div>

            <FormControl
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
              required
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              className="bg-[#1B39E9] text-white hover:bg-[#1A2EB9] disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up Now"}
            </Button>
          </form>

          <Divider />

          <Button
            className="text-[#3B4043] border-[0.5px] border-solid border-[#D4D4D4] hover:bg-gray-100"
            icon={`${import.meta.env.PUBLIC_URL || ""}/img/flat-color-icons_google.svg`}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Continue with Google
          </Button>

          <div className="mt-4 text-center">
            <span className="text-[#B9B9B9]">Already have an account? </span>
            <Link 
              to="/login" 
              className="text-[#1B39E9] hover:underline"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      <div className="relative">
        <img
          src={`${import.meta.env.BASE_URL}img/signup.png`}
          alt="Signup"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;