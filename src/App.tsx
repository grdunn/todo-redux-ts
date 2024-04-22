import { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./state/store";
import { deleteTodo, addTodo } from "./state/todos/todosSlice";

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

  return (
    <>
      <input
        placeholder="Add a new todo..."
        onChange={handleChange}
        value={todo}
        type="text"
      />
      <button onClick={handleSubmit} type="button">
        Add Todo
      </button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;
