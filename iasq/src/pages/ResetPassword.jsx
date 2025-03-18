import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import FormControl from "../components/FormControl";
import Button from "../components/Button";
import Divider from "../components/Divider";
import { Link } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter OTP, 3: Set new password

 // Send OTP to email
  const sendOTP = async () => {
    try {
      const response = await axios.post("https://api.example.com/send-otp", { email });
      console.log(response.data.message);
      setStep(2);// Go to the OTP entry step
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // Verify OTP and reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (step === 2) {
      try {
        const response = await axios.post("https://api.example.com/verify-otp", { email, otp });
        console.log(response.data.message);
        setStep(3); // Go to the new password entry step
      } catch (error) {
        setError(error.response?.data?.message || "Invalid OTP");
      }
    }

    if (step === 3) {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        const response = await axios.post("https://api.example.com/reset-password", {
          email,
          newPassword,
        });
        console.log(response.data.message);
        navigate("/login"); // Go to the login page after success
      } catch (error) {
        setError(error.response?.data?.message || "Failed to reset password");
      }
    }
  };

  return (
    <div className="grid grid-cols-[57%_43%] min-h-screen">
      <div className="flex items-center justify-center px-[100px] py-[120px]">
        <div className="w-full">
          <div className="mb-[20px]">
            <h2 className="font-medium text-[28px]">IASQ</h2>
            <p className="text-[#B9B9B9] text-[19px]">
              Reset your password to regain access to your account
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); sendOTP(); }}>
              <FormControl
                label="Email address"
                id="email"
                type="email"
                placeholder="Name@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="bg-[#1B39E9] text-white hover:bg-[#1A2EB9]">
                Send OTP
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword}>
              <FormControl
                label="Enter OTP"
                id="otp"
                type="text"
                placeholder="Enter the OTP sent to your email"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button type="submit" className="bg-[#1B39E9] text-white hover:bg-[#1A2EB9]">
                Verify OTP
              </Button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <FormControl
                label="New Password"
                id="newPassword"
                type="password"
                placeholder="Enter your new password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <FormControl
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button type="submit" className="bg-[#1B39E9] text-white hover:bg-[#1A2EB9]">
                Reset Password
              </Button>
            </form>
          )}

          {error && <p className="text-red-500">{error}</p>}

          <Divider />

          <div className="mt-4 text-center">
            <Link to="/login" className="text-[#1B39E9] hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      <div className="relative">
        <img
          src="/img/resetpassword.jpg"
          alt="Reset Password"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
