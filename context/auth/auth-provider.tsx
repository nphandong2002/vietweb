"use client";

import { useMemo, useReducer } from "react";
import { AuthContext } from "./auth-context";
import { ActionsType, AuthStateType, Types } from "./types";

const STORAGE_KEY = "accessToken";

type Props = {
  children: React.ReactNode;
};

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;
  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: false,
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
    }),
    [],
  );
  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
