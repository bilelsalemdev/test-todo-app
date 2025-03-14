import axios from "axios";
import { AuthResponse, LoginData, RegisterData } from "../types/Auth";
import { Task } from "../types/Task";

// In production, API requests will go through the /api proxy configured in nginx
// In development, it points to the local backend
const API_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
};

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get("/tasks");
    return response.data;
  },

  createTask: async (
    task: Omit<Task, "_id" | "createdAt" | "updatedAt">
  ): Promise<Task> => {
    const response = await api.post("/tasks", task);
    return response.data;
  },

  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
