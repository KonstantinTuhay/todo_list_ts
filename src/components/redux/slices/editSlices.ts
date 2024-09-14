import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = string;

const initialState: InitialState = "";

const editSlices = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    editTask: (state, action: PayloadAction<string>) => {
      return (state = action.payload);
    },
  },
});

export const { editTask } = editSlices.actions;
export default editSlices.reducer;
