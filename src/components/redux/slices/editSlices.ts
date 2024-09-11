import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialState = null | string;

const initialState: InitialState = null;

const editSlices = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    editTask: (state, action: PayloadAction<InitialState>) => {
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
