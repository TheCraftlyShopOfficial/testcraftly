import store from "@/lib/store/store";
import { getUser } from "@/lib/store/slices/authSlice";
import { HOST } from "@/lib/env";

export const getAuthState = async () => {
  try {
    // Step 1: Check if the user is already in the Redux store
    const currentState = store.getState();
    const existingUser = currentState.auth.user;

    if (existingUser) {
      // If the user is already authenticated, return the state from Redux
      return {
        isAuth: true,
        user: existingUser,
      };
    }

    // // Step 2: Check if the auth-token is present in the cookies
    // const token = document.cookie
    //   .split("; ")
    //   .find((row) => row.startsWith("auth-token="))
    //   ?.split("=")[1];

    // console.log(token, document.cookie);

    // if (!token) {
    //   // If no auth-token is found, return unauthenticated state
    //   const state = {
    //     isAuth: false,
    //     user: null,
    //   };
    //   store.dispatch(getUser(state));
    //   return state;
    // }

    // Step 3: If the auth-token is present, fetch user data from the API
    const response = await fetch(`${HOST}/api/auth/login`, {
      method: "GET",
      credentials: "include", // Important to include cookies
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }

    const data = await response.json();
    const state = {
      isAuth: true,
      user: data.user,
    };

    // Step 4: Dispatch the user data to the Redux store
    store.dispatch(getUser(state));
    return state;
  } catch (error) {
    console.error("Error fetching auth state:", error);
    const state = {
      isAuth: false,
      user: null,
    };

    // Dispatch the failure state to the Redux store
    store.dispatch(getUser(state));
    return state;
  }
};
