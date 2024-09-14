import { createAction, createReducer } from "@reduxjs/toolkit";

export const previousEditTask = createAction("task2/editTask");

const initialState = "";

const previousEditReducer = createReducer(initialState, (builder) => {
  builder.addCase(previousEditTask, (state, action) => {
    return (state = action.payload);
  });
});

export default previousEditReducer;
