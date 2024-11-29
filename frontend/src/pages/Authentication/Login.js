import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded admin credentials
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      // Set a dummy token for the admin
      localStorage.setItem("authToken", "adminToken");
      navigate("/admin/dashboard"); // Redirect to admin dashboard
    } else if (email && password) {
      // For now, assume any other email/password combination is valid for user login
      localStorage.setItem("authToken", "userToken");
      navigate("/user/dashboard"); // Redirect to user dashboard
    } else {
      alert("Please enter valid credentials!");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-yellow-400 to-red-500 flex justify-center items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
      ></div>
      <div className="relative bg-white p-10 rounded-lg shadow-xl w-80 md:w-96 z-10">
        <Typography variant="h5" className="text-center font-bold mb-6 text-gray-800">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
          >
            Login
          </Button>
        </form>
        <div className="mt-4 text-center">
          <a href="/register" className="text-blue-500 hover:underline">
            Don't have an account? Register
          </a>
          <br />
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
