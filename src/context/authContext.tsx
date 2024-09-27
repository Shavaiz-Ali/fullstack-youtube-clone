/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axiosClient from "@/config";
import { loginSchema, registerSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { z } from "zod";

// Define initial state
interface AuthState {
  isAuthenticated: boolean;
  user: null | any;
  loader: boolean;
  alert: {
    message: string | undefined;
    type: string | undefined;
    visible: boolean;
  };
}

// Action types for the reducer
type AuthAction =
  | { type: "SET_USER"; payload: any }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ALERT"; payload: { message: string; type: string } }
  | { type: "CLEAR_ALERT" }
  | { type: "SET_AUTH"; payload: boolean };

// Initial state for the reducer
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loader: false,
  alert: {
    message: undefined,
    type: undefined,
    visible: false,
  },
};

// Reducer function to handle state changes
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "SET_LOADING":
      return { ...state, loader: action.payload };
    case "SET_ALERT":
      return { ...state, alert: { ...action.payload, visible: true } };
    case "CLEAR_ALERT":
      return { ...state, alert: { message: undefined, type: undefined, visible: false } };
    case "SET_AUTH":
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
}

// Context creation
const AuthContext = createContext<AuthState | any>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // Helper function for setting alert
  const setAlert = (message: string, type: string) => {
    dispatch({ type: "SET_ALERT", payload: { message, type } });
    setTimeout(() => {
      dispatch({ type: "CLEAR_ALERT" });
    }, 3000); // Clear the alert after 3 seconds
  };

  const registerUser = async (data: z.infer<typeof registerSchema>) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await axiosClient.post("/api/users/register", data);
      dispatch({ type: "SET_LOADING", payload: false });

      if (response?.data?.success === false) {
        setAlert(response.data.message || "Registration failed.", "destructive");
      } else {
        setAlert(response.data.message || "Registration successful!", "success");
        router.push("/auth/register")
      }

      return response;
    } catch (error: any) {
      dispatch({ type: "SET_LOADING", payload: false });
      setAlert(error?.response?.data?.message || "Registration failed.", "destructive");
    }
  };

  const loginUser = async (data: z.infer<typeof loginSchema>) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await axiosClient.post("/api/users/login", data);
      dispatch({ type: "SET_LOADING", payload: false });

      if (response?.data?.success === false) {
        setAlert(response.data.message || "Login failed.", "destructive");
      } else {
        dispatch({ type: "SET_USER", payload: response.data.user });
        setAlert(response.data.message || "Login successful!", "success");
        router.push("/")
      }

      return response;
    } catch (error: any) {
      dispatch({ type: "SET_LOADING", payload: false });
      setAlert(error?.response?.data?.message || "Login failed.", "destructive");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthContext };
