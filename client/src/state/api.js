import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "CrimeData",
    "CaseInfo",    
    "Admins",    
    "Dashboard",
    "Reports",
    "Users"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getCrimeData: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/crimedata",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["CrimeData"],
    }),
    getCaseInfo: build.query({
      query: () => "client/caseinfo",
      providesTags: ["CaseInfo"],
    }),    
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }), 
    getUsers: build.query({
      query: () => "/user/",
      providesTags: ["Users"],
    }),   
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getReports:  build.query({
      query:()=>"reports/reports",
      providesTags: ["Reports"]
    })
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useGetCrimeDataQuery,  
  useGetCaseInfoQuery,
  useGetAdminsQuery,  
  useGetDashboardQuery,
  useGetReportsQuery
} = api;