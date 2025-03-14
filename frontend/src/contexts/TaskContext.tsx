import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { Task } from "../types/Task";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (
    task: Omit<Task, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (
    task: Omit<Task, "_id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const newTask = await api.createTask(task);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setError("Failed to create task");
      throw err;
    }
  };

  const updateTask = async (id: string, task: Partial<Task>) => {
    try {
      const updatedTask = await api.updateTask(id, task);
      setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
    } catch (err) {
      setError("Failed to update task");
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError("Failed to delete task");
      throw err;
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, createTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
