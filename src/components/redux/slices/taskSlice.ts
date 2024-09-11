import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialState = {
  id: string;
  text: string;
  isCompleted: boolean;
};

const initialState: InitialState[] = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.push({
        id: crypto.randomUUID(),
        text: action.payload,
        isCompleted: false,
      });
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    editChange: (state, action: PayloadAction<string>) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.text = action.payload.previousEdit;
      }
    },
  },
});

export const { addTask, toggleTask, editChange, removeTask } =
  taskSlice.actions;
export default taskSlice.reducer;
