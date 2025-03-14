import {
  Alert,
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const LoginForm = () => {
  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Card sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" size="large">
            Login
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export const RegisterForm = () => {
  const { register, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password, name });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <Card sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Register
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" size="large">
            Register
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};
