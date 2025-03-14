import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { LoginForm, RegisterForm } from "./components/AuthForms";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const AuthenticatedApp = () => {
  const { user, logout } = useAuth();

  return (
    <TaskProvider>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h4">Task Manager</Typography>
            <Box>
              <Typography variant="subtitle1" sx={{ mr: 2, display: "inline" }}>
                Welcome, {user?.name}
              </Typography>
              <Button variant="outlined" onClick={logout}>
                Logout
              </Button>
            </Box>
          </Box>
          <TaskForm />
          <TaskList />
        </Container>
      </Box>
    </TaskProvider>
  );
};

const UnauthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="sm">
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Need an account? Register" : "Have an account? Login"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </Box>
    );
  }

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};
