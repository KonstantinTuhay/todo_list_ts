import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./slices/taskSlice";
import editSlices from "./slices/editSlices";
import previousEditSlice from "./slices/previousEditSlice";
import addSlice from "./slices/addSlice";
import { toDoApi } from "../../apiRQuery";
// import tasksReducer from "./reducers/taskReducer";
// import editReducer from "./reducers/editReducer";
// import previousEditReducer from "./reducers/previousEditReducer";
// import previousEditSlice from "./slices/previousEditSlice";
// import addReducer from "./reducers/addReducer";

export const store = configureStore({
  reducer: {
    addSlice: addSlice,
    previousEditSlice: previousEditSlice,
    editWithSlice: editSlices,
    tasksSlice: tasksSlice,
    [toDoApi.reducerPath]: toDoApi.reducer,
    // addReducer: addReducer,
    // previousEditReducer: previousEditReducer,
    // editReducer: editReducer,
    // tasksReducer: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(toDoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
