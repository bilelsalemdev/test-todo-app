import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../services/api";
import { AuthResponse, LoginData, RegisterData, User } from "../types/Auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved auth data
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const handleAuthResponse = (response: AuthResponse) => {
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    setError(null);
  };

  const login = async (data: LoginData) => {
    try {
      const response = await authApi.login(data);
      handleAuthResponse(response);
    } catch (err) {
      setError("Invalid credentials");
      throw err;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authApi.register(data);
      handleAuthResponse(response);
    } catch (err) {
      setError("Registration failed");
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
