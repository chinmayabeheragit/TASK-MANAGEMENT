import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/forgot-password", { email });
      alert("Check your email for a reset link!");
      navigate("/login");
    } catch (error) {
      alert("Failed to send reset link.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-yellow-400 to-red-500 flex justify-center items-center">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/forgot-password-bg.jpg')" }}></div>
      <div className="relative bg-white p-10 rounded-lg shadow-xl w-80 md:w-96 z-10">
        <Typography variant="h5" className="text-center font-bold mb-6 text-gray-800">
          Forgot Password?
        </Typography>
        <form onSubmit={handleForgotPassword}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
          >
            Send Reset Link
          </Button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">Go back to login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
