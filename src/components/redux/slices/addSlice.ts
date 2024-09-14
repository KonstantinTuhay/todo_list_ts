import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = string;

const initialState: InitialState = "";

const addSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTaskInput: (state, action: PayloadAction<string>) => {
      return (state = action.payload);
    },
  },
});

export const { addTaskInput } = addSlice.actions;
export default addSlice.reducer;
