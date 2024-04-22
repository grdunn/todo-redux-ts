import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Todos {
  id: number;
  todo: string;
  completed: boolean;
  userId?: number;
}

const initialState: Todos[] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      return (state = action.payload);
    },
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        todo: action.payload,
        completed: false,
      };
      state.unshift(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { deleteTodo, addTodo, toggleTodo, setTodos } = todosSlice.actions;
export default todosSlice.reducer;
