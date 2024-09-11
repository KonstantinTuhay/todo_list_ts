import { createSlice } from "@reduxjs/toolkit";

const previousEditSlice = createSlice({
  name: "tasks",
  initialState: "",
  reducers: {
    previousEditTask: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { previousEditTask } = previousEditSlice.actions;
export default previousEditSlice.reducer;
