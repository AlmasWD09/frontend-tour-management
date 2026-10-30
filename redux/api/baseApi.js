import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");

      if (typeof document !== "undefined") {
        const tokenCookie = document.cookie
          .split("; ")
          .find((cookie) => cookie.startsWith("token="));

        if (tokenCookie) {
          headers.set(
            "Authorization",
            `Bearer ${decodeURIComponent(tokenCookie.slice(6))}`,
          );
        }
      }

      return headers;
    },
  }),
  tagTypes: ["web-auth", "login"],
  endpoints: () => ({}),
});
