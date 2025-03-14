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
  Card,
  Fade,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Flag as FlagIcon,
  Label as LabelIcon,
} from "@mui/icons-material";
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
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card sx={{ p: 4, textAlign: "center", bgcolor: "background.paper" }}>
        <Typography variant="h6" color="textSecondary">
          No tasks yet
        </Typography>
        <Typography color="textSecondary">
          Add a new task to get started!
        </Typography>
      </Card>
    );
  }

  return (
    <List sx={{ bgcolor: "transparent" }}>
      {tasks.map((task, index) => (
        <Fade
          in={true}
          timeout={300}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <Card
            key={task._id}
            sx={{
              mb: 2,
              bgcolor: "background.paper",
              transition:
                "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 3,
              },
            }}
          >
            <ListItem>
              <Checkbox
                checked={task.completed}
                onChange={() =>
                  updateTask(task._id, { completed: !task.completed })
                }
                sx={{ mr: 1 }}
              />
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.completed ? "text.secondary" : "text.primary",
                    }}
                  >
                    {task.text}
                  </Typography>
                }
                secondary={
                  <Stack direction="row" spacing={1} mt={1}>
                    <Chip
                      icon={<FlagIcon />}
                      label={task.priority}
                      size="small"
                      color={getPriorityColor(task.priority)}
                    />
                    {task.category && (
                      <Chip
                        icon={<LabelIcon />}
                        label={task.category}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTask(task._id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Card>
        </Fade>
      ))}
    </List>
  );
};

export default TaskList;
