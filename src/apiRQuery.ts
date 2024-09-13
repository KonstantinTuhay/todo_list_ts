import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

interface Todo {
  id: string;
  title: string;
  user_id: number;
  isCompleted: boolean;
}

export const toDoApi = createApi({
  reducerPath: "toDoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-redev.herokuapp.com/api",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getToDos: builder.query<Todo[], void>({
      query: () => {
        return {
          url: `/todos`,
          method: "GET",
          headers,
        };
      },
      transformResponse: (response) => response,
      providesTags: ["Todos"],
    }),
    createToDo: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: `/todos`,
          method: "POST",
          headers,
          body: body,
        };
      },
      invalidatesTags: ["Todos"],
    }),
    deleteToDo: builder.mutation({
      query: (id) => {
        return {
          url: `/todos/${id}`,
          method: "DELETE",
          headers,
        };
      },
      invalidatesTags: ["Todos"],
      transformResponse: (response: {
        data: {
          id: string;
          title: string;
          user_id: number;
          isCompleted: boolean;
        };
      }) => response.data,
      transformErrorResponse: (response) => response.status,
    }),
    isCompletedTask: builder.mutation({
      query: ({ id, completedTask }) => ({
        url: `/todos/${id}/isCompleted`,
        method: "PATCH",
        body: completedTask,
        headers,
      }),
      invalidatesTags: ["Todos"],
    }),
    isUpdatedTask: builder.mutation({
      query: ({ id, updatedTask }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: updatedTask,
        headers,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetToDosQuery,
  useCreateToDoMutation,
  useDeleteToDoMutation,
  useIsCompletedTaskMutation,
  useIsUpdatedTaskMutation,
} = toDoApi;
