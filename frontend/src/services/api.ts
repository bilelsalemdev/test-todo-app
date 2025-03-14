import axios from "axios";
import { Task } from "../types/Task";

const API_URL = "http://localhost:3000";

export const api = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  },

  createTask: async (
    task: Omit<Task, "_id" | "createdAt" | "updatedAt">
  ): Promise<Task> => {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  },

  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await axios.patch(`${API_URL}/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/tasks/${id}`);
  },
};
