import { useState } from "react";
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

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Sending Data:", { email, first_name: firstName, last_name: lastName, password });
    try {
      const response = await axios.post(`${API_BASE_URL}/signup/`, {
        email,
        first_name : firstName,
        last_name: lastName,
        password,
      });
      console.log("Signup Response:", response.data); 

      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        
        navigate("/home");
      }
    } catch {
      alert("Signup failed! Please try again.");
      console.error("Signup failed!");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://your-api.com/auth/google"; // Redirect to Google login
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
            <FormControl
              label="Email address"
              id="email"
              type="email"
              placeholder="Name@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormControl
                label="First Name"
                id="first-name"
                type="text"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormControl
                label="Last Name"
                id="last-name"
                type="text"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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
              Sign Up Now
            </Button>
          </form>
          <Divider />
          <Button
            className="text-[#3B4043] border-[0.5px] border-solid border-[#D4D4D4] hover:bg-gray-100"
            icon="/img/flat-color-icons_google.svg"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>
          <div className="mt-4 text-center">
            <span className="text-[#B9B9B9]">Already have an account? </span>
            <Link to="/login" className="text-[#1B39E9] hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>

      <div className="relative">
        <img
          src="/img/signup.png"
          alt="Signup"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
