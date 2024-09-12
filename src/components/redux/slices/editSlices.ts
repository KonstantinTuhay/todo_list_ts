import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialState = string | null;

const initialState: InitialState = null;

const editSlices = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    editTask: (state, action: PayloadAction<InitialState>): string | null => {
      if (typeof state === "string") {
        return (state = action.payload);
      } else {
        return state;
      }
    },
  },
});

export const { editTask } = editSlices.actions;
export default editSlices.reducer;
