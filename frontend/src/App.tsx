import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./contexts/TaskContext";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskProvider>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <TaskForm />
          <TaskList />
        </Container>
      </TaskProvider>
    </ThemeProvider>
  );
}
