import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, URL } from "./Constant";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { endpoint }) => {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      console.log("user_detailskss", token, endpoint);
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      console.log("Endpoints", endpoint);
      // For multipart uploads, let the browser set Content-Type with boundary
      const multipartEndpoints = [
        "addGraphicalQuestion",
        "addPaperQuestion",
        "uploadTextQuestionsCsv",
        "updateGraphicalQuestion",
        "addPastQuestion",
        "updatePastQuestion",
        "uploadSubjectUnitsCsv",
        "uploadUnitTopicsCsv",
      ];
      if (!multipartEndpoints.includes(endpoint)) {
        headers.set("Content-Type", "application/json");
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  tagTypes: [],
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (payload) => ({
        url: URL.LOGIN,
        method: "POST",
        body: payload,
      }),
    }), 
  }),
});

export const {
  useLoginMutation,
  
} = api;

