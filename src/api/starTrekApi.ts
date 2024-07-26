import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Result } from "../utils/model";

export const URL = "https://stapi.co/api/v1/rest/character/search";

export const stApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  endpoints: (builder) => ({
    getCharacterByName: builder.query<Result, string>({
      query: (name: string) => ({
        url: `${URL}?pageNumber=0`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: `name=${name}`,
      }),
      keepUnusedDataFor: 1,
    }),
    getCharactersByPage: builder.query<Result, string>({
      query: (info) => ({
        url: `${URL}?pageNumber=${info.split(" ")[0]}`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: `name=${info.split(" ")[1]}`,
      }),
      keepUnusedDataFor: 1,
    }),
    getCharacterInfo: builder.query<Result, string>({
      query: (name: string) => ({
        url: `${URL}`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: `name=${decodeURI(name)}`,
      }),
      keepUnusedDataFor: 1,
    }),
  }),
});
