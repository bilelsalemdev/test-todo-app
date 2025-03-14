import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { TaskPriority } from "../types/Task";
import { useTaskContext } from "../contexts/TaskContext";

const TaskForm = () => {
  const { createTask } = useTaskContext();
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask({
        text,
        priority,
        category,
        completed: false,
      });
      setText("");
      setPriority(TaskPriority.MEDIUM);
      setCategory("");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            label="Priority"
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
          >
            <MenuItem value={TaskPriority.LOW}>Low</MenuItem>
            <MenuItem value={TaskPriority.MEDIUM}>Medium</MenuItem>
            <MenuItem value={TaskPriority.HIGH}>High</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button type="submit" variant="contained" disabled={!text}>
          Add Task
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskForm; 