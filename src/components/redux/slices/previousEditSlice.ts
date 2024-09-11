import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const previousEditSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    previousEditTask: (state, action: PayloadAction<string>) => {
      return (state = action.payload);
    },
  },
});

export const { previousEditTask } = previousEditSlice.actions;
export default previousEditSlice.reducer;
