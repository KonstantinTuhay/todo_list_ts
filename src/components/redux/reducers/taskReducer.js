import { createAction, createReducer } from "@reduxjs/toolkit";

export const addTask = createAction("tasks2/addTask");
export const toggleTask = createAction("tasks2/toggleTask");
export const removeTask = createAction("task2/removeTask");
export const editChange = createAction("task2/editChange");

const initialState = [];

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTask, (state, action) => {
      state.push({
        id: crypto.randomUUID(),
        text: action.payload,
        isCompleted: false,
      });
    })
    .addCase(toggleTask, (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      console.log(task);

      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    })
    .addCase(removeTask, (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    })
    .addCase(editChange, (state, action) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.text = action.payload.previousEdit;
      }
    });
});

export default taskReducer;
