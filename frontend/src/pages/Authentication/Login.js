import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Handles the login process for users.
 * If the entered credentials match the hardcoded admin credentials,
 * the user is redirected to the admin dashboard. Otherwise, an API
 * call is made to authenticate the user and, upon success, the user
 * is redirected to the user dashboard. Displays an alert in case of
 * a login failure.
 *
 * @param {Object} e - The event object from the form submission.
 */
/******  a3bb3f6b-3f58-40fb-85d2-e0bb7dafff0d  *******/  const handleLogin = async (e) => {
    e.preventDefault();

    // Hardcoded admin credentials
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      // Set a dummy token for the admin
      localStorage.setItem("authToken", "adminToken");
      navigate("/admin/dashboard"); // Redirect to admin dashboard
      return;
    }

    try {
      // Proceed with the API call for non-admin login
      const response = await axios.post("/api/auth/login", { email, password });

      // Assume the API returns a token on successful login
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("authToken", token);

      navigate("/user/dashboard"); // Redirect to user dashboard
    } catch (error) {
      alert("Login failed! Please try again.");
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
