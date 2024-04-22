import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Todos {
  id: number;
  text: string;
  completed: boolean;
}

const initialState: Todos[] = [
  { id: 1, text: "Complete your homework.", completed: false },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleTodo: (state, action) => {
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

export const { deleteTodo, addTodo } = todosSlice.actions;
export default todosSlice.reducer;
