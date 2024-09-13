import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialState = string;

const initialState: InitialState = null;

const editSlices = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    editTask: (state, action: PayloadAction<InitialState>): InitialState => {
      if (typeof action.payload === "string") {
        return (state = action.payload);
      } else {
        return state;
      }
    },
  },
});

export const { editTask } = editSlices.actions;
export default editSlices.reducer;
