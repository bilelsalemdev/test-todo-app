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
  Card,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
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
    <Card sx={{ p: 3, mb: 4, boxShadow: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add New Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Task Description"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            variant="outlined"
            placeholder="What needs to be done?"
          />
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              <MenuItem value={TaskPriority.LOW}>Low Priority</MenuItem>
              <MenuItem value={TaskPriority.MEDIUM}>Medium Priority</MenuItem>
              <MenuItem value={TaskPriority.HIGH}>High Priority</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Work, Personal, Shopping"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!text}
            startIcon={<AddIcon />}
          >
            Add Task
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default TaskForm;
