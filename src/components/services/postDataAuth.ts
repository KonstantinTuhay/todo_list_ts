import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
};

const postDataAuth = createApi({
  reducerPath: "postDataAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    postData: builder.mutation({
      query: (dataUser) => {
        console.log(dataUser);
        // navigate("/todo");
        // reset();

        return {
          url: "/auth/login",
          method: "POST",
          headers,
          dataUser: dataUser,
        };
      },

      invalidatesTags: ["postDataAut"],
    }),
  }),
});

export const { useCreateToDoMutation } = postDataAuth;
