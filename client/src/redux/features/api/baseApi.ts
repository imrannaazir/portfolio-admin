import { RootState } from "@/redux/store";
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logIn, logOut } from "../auth/authSlice";
import { jwtDecode } from "jwt-decode";

const url = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: url,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    toast.error(result?.error?.data?.errorSources[0].message, {
      duration: 2000,
    });
  }
  if (result?.error?.status === 403) {
    toast.error(result?.error?.data?.errorSources[0].message, {
      duration: 2000,
    });
  }

  if (result?.error?.status === 401) {
    // get refresh token
    const res = await fetch(`${url}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    const token = data?.data?.accessToken;

    if (token) {
      api.dispatch(logIn({ accessToken: token, user: jwtDecode(token) }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
      await fetch(`${url}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    }
  }

  // return result
  return result;
};

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "Projects",
    "Project",
    "Experiences",
    "Experience",
    "Blogs",
    "Blog",
    "Skills",
    "Skill",
  ],
  endpoints: () => ({}),
});

export default baseApi;
