import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./state/store";
import {
  deleteTodo,
  addTodo,
  toggleTodo,
  setTodos,
} from "./state/todos/todosSlice";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function App() {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  const [todo, setTodo] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(addTodo(todo));
    setTodo("");
  };

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        "https://dummyjson.com/todos?limit=10&skip=10"
      );
      const todos = await response.json();
      dispatch(setTodos(todos.todos));
    };
    fetchTodos().catch(console.error);
  }, []);
  return (
    <>
      <Container maxWidth="sm">
        <div className="header">
          <Typography variant="h4">Today's Task</Typography>
          <Button
            aria-label="add"
            onClick={handleSubmit}
            variant="contained"
            endIcon={<AddIcon />}
          >
            Add
          </Button>
        </div>
        <div className="todo-input">
          <TextField
            fullWidth
            label="Add a new todo..."
            onChange={handleChange}
            value={todo}
            type="text"
            variant="outlined"
          />
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className={todo.completed ? "completed" : ""} key={todo.id}>
              <div className="todo-input">
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => handleToggle(todo.id)}
                      checked={todo.completed}
                    />
                  }
                  label={<Typography variant="body1">{todo.todo}</Typography>}
                />
                <Fab
                  size="small"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  color="primary"
                  aria-label="delete"
                >
                  <DeleteOutlineIcon />
                </Fab>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

export default App;
