import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Chip,
  Stack,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useTaskContext } from "../contexts/TaskContext";
import { TaskPriority } from "../types/Task";

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.HIGH:
      return "error";
    case TaskPriority.MEDIUM:
      return "warning";
    case TaskPriority.LOW:
      return "success";
    default:
      return "default";
  }
};

const TaskList = () => {
  const { tasks, loading, error, updateTask, deleteTask } = useTaskContext();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (tasks.length === 0) {
    return (
      <Typography variant="subtitle1" color="textSecondary" textAlign="center">
        No tasks yet. Add one above!
      </Typography>
    );
  }

  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task._id}
          sx={{
            bgcolor: "background.paper",
            mb: 1,
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Checkbox
            checked={task.completed}
            onChange={() =>
              updateTask(task._id, { completed: !task.completed })
            }
          />
          <ListItemText
            primary={
              <Typography
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </Typography>
            }
            secondary={
              <Stack direction="row" spacing={1} mt={0.5}>
                <Chip
                  label={task.priority}
                  size="small"
                  color={getPriorityColor(task.priority)}
                />
                {task.category && (
                  <Chip label={task.category} size="small" variant="outlined" />
                )}
              </Stack>
            }
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteTask(task._id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList; 